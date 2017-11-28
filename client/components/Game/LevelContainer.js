// Wrapper for game world (that you should try and keep as slim as possible)
// This is responsible for receiving data from socketIOHOC and pass it down to the game
import React, { Component } from 'react'
import { Segment, Button, Loader } from 'semantic-ui-react'

// Lovers sepreated by a container
import socketIOHOC from './socketIOHOC'
import LevelCanvas from './LevelCanvas'

// Important!!! need to solidify how this works and document well cuzz its a lil confusing
// Custom server emit names must be passed both to the server, and to socketIOHOC

// Need to make like a levelConfig.js and export these to both Conatiner and Canvas ?
const buttonClickReceived = 'buttonClickReceived'

// Add all custom names to here
const arrayOfCustomReceivedEmitNames = [buttonClickReceived]

class LevelContainer extends Component {
  // This is dummy stuff for procejerelly generated socket events
  // may use, may rip out, think i'll need them for random objects from game world
  // handleClick = () => {
  //   const data = {
  //     message: 'some sort of data',
  //     serverEmitName: buttonClickReceived
  //   }

  //   this.props.socket.emit('buttonClicked', data)
  // }

  // renderMessages = () => {
  //   const returNodes = []
  //   const { messages } = this.props.gameData

  //   messages.forEach((message, key) => {
  //     returNodes.push(<div key={ key }>{ message }</div>)
  //   })

  //   return(
  //     <div>
  //       { returNodes }
  //     </div>
  //   )
  // }

  render() {
    const { gameData} = this.props
    const { waitingOnPartner, partnerId, latestCoordinates } = gameData

    return(
      <Segment inverted>
        { partnerId ? null : (<div>Waiting for another player to Join. <Loader active /> </div>) }
        {/* messages.length ? this.renderMessages() : null */}
        {/*<Button 
          inverted 
          onClick={ this.handleClick }
        >
          test click
        </Button>*/}

        <LevelCanvas
          partnerId={ partnerId }
          latestCoordinates={ latestCoordinates }
          socket={ this.props.socket }
        />
      </Segment>
    )
  }
}

export default socketIOHOC(LevelContainer, arrayOfCustomReceivedEmitNames)