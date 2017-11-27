const app = require('./server/server')

// WebSockets! // put this somewhere else at some point
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// todo: make this less lazyily done
let arrayOfUserPairs = []
const partnerUpUsersOrTellThemToWait = function(socket) {
  io.clients((error, clients) => {
    if (error) { throw error }
    
    let currentUser 
    let priorUser 

    if(clients.length) {
      currentUser = clients[clients.length - 1]
    } 

    if(clients.length > 1){
      priorUser = clients[clients.length - 2]
    }

    if(currentUser && priorUser && clients.length % 2 === 0) {
      // This is so we if a user drops, we can search the pair and update the other user
      // there is definitely a more efficient way to store this data
      arrayOfUserPairs.push([currentUser, priorUser])

      // Emit partnerId to new pari of users
      socket.emit('partnerFound', priorUser)
            .to(priorUser)
            .emit('partnerFound', currentUser);

    } else if(currentUser) {
      console.log('so this isnt working 0_o');
      // emit 'waiting for another user'
      socket.emit('waitingOnPartner', 'WAITING');
      // socket.broadcast.to(id).emit('my message', msg);
    }
  }) 
}

io.on('connection', function(socket){
  // Emit events for a user to wait for a partner or that they just got one
  partnerUpUsersOrTellThemToWait(socket)

  socket.on('joinRoom', function(data) {
    const { roomName } = data

    if(roomName) {
      socket.join(roomName)
    }
  })

  // Could come from multiple different 'buttons' but want to target a specific component
  socket.on('buttonClicked', function(data){
    if(data && data.serverEmitName && data.message) {
      socket.emit(`${data.serverEmitName}`, data.message)
    }
  })


  socket.on('disconnect', function(){
    console.log('disconnect');
  })
})

server.listen(5000, () => {
  console.log('Listening');
})
