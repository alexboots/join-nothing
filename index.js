const app = require('./server/server')

// WebSockets! // put this somewhere else at some point
const server = require('http').createServer(app)
const io = require('socket.io')(server)


// ORGANIZE THIS ALL INTO MODULES FOR FUTURE YOU THX

let currentUser
let priorUser

// lets make a users by key object for easy lookups
// maybe I should implement redux on server?
// const pairKeysByUserId = { pairKey: pairKey }
// const userPairsByKey = {}

// actually...

const userPairingsById = {}
const partnerUpUsersOrTellThemToWait = function(socket) {
  io.clients((error, clients) => {
    if (error) { throw error }

    if(clients.length) {
      currentUser = clients[clients.length - 1]
    } 

    if(clients.length > 1){
      priorUser = clients[clients.length - 2]
    }

    if(currentUser && priorUser && clients.length % 2 === 0) {
      // current user id is key / partner is data associated with key
      userPairingsById[currentUser] = priorUser
      userPairingsById[priorUser] = currentUser

      // Hmm. keep the pairedUserId in the state on the frontend so we can pass it down with movement data.
      socket.emit('partnerFound', userPairingsById[priorUser]) 
            .to(priorUser)
            // emit goes to current socket / user
            .emit('partnerFound', userPairingsById[currentUser]);

    }
    // No need for an else {} because the 'waiting for partner' state is the default state of the UI
  })
}

io.on('connection', function(socket){
  // Emit events for a user to wait for a partner or that they just got one
  partnerUpUsersOrTellThemToWait(socket) // maybe call every X seconds and check if everyone is paired incase some crazy shit went down i dont understand

  // Game logic
  socket.on('latestCoordinates', function(data) {
    console.log('data ??? ');
    const partnerId = userPairingsById[socket.id]
    socket.to(partnerId).emit('latestCoordinates', data)
  })

  // Could come from multiple different 'buttons' but want to target a specific component
  // socket.on('buttonClicked', function(data){
  //   if(data && data.serverEmitName && data.message) {
  //     socket.emit(`${data.serverEmitName}`, data.message)
  //   }
  // })

  socket.on('disconnect', function(){

    // Remove user and send 'your partner disconnected' to other user in pair
    console.log('\n\n!~~~disconnect\n\n');
  })
})

server.listen(5000, () => {
  console.log('Im listening (said in Frasier voice).');
})
