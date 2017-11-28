// Wrapper for game world. 
// Getting data from socketIOHOC and passing it down to the game world where needed
import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import io from 'socket.io-client';

import socketIOHOC from './socketIOHOC'
import GameWorld from './GameWorld'

// Important!!!
// Custom server emit names must be passed both to the server, and to socketIOHOC
const buttonClickReceived = 'buttonClickReceived'

// Add all custom names to here
const arrayOfCustomReceivedEmitNames = [buttonClickReceived]

class GameView extends Component {
  handleClick = () => {
    const data = {
      message: 'some sort of data',
      serverEmitName: buttonClickReceived
    }
    this.props.socket.emit('buttonClicked', data)
  }

  renderMessages = () => {
    const returNodes = []
    const { messages } = this.props.receivedData

    messages.forEach((message, key) => {
      returNodes.push(<div key={ key }>{ message }</div>)
    })

    return(
      <div>
        { returNodes }
      </div>
    )
  }

  render() {
    const { partner, messages } = this.props.receivedData

    return(
      <Segment inverted>
        { partner ? <div>PARTNER FOUND</div> : <div>NO PARTNER</div> }
        { messages.length ? this.renderMessages() : null }
        {/*<Button 
          inverted 
          onClick={ this.handleClick }
        >
          test click
        </Button>*/}

        <GameWorld 
          newPositionDataReceived={this.props.newPositionDataReceived}
          socket={ this.props.socket }
        />
      </Segment>
    )
  }
}

export default socketIOHOC(GameView, arrayOfCustomReceivedEmitNames)