import React, { Component } from 'react'
import io from 'socket.io-client'

// Todo: see if it data gets confusing to follow and if it does, 
//       implement redux here w socket.io middleware
export default (WrappedComponent, receiveEmitNames) => {
  class socketIOHOC extends Component {
    constructor(props) {
      super(props)
      this.socket = io()

      this.state = {
        partnerId: null,
        latestCoordinates: null
      }

      this.socket.on('partnerFound', (partnerId) => {
        this.setState({ partnerId })
      })

      this.socket.on('latestCoordinates', (data) => {
        this.setState({ latestCoordinates: data })
      })

      // Create component specific messages based on user actions
      if(!receiveEmitNames) {
        return
      }
      
      // Generic
      // So we can easily make new game components without having to make a socket connection for
      // each new game object we're dealing with ( I feel like this will come in handy )
      receiveEmitNames.forEach((receiveEmitName) => {
        this.socket.on(`${receiveEmitName}`, (message) => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        })
      })

    }

    render() {
      return (
        <WrappedComponent 
          { ...this.props }
          gameData={ this.state }
          socket={ this.socket }
        />
      )
    } 
  }

  return socketIOHOC
}