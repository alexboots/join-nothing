import React, { Component } from 'react'
import io from 'socket.io-client'

export default (WrappedComponent, receiveEmitNames) => {
  class socketIOHOC extends Component {
    constructor(props) {
      super(props)
      this.socket = io()

      this.state = {
        messages: [],
        partner: false
      }

      // Universal messages
      this.socket.on('waitingOnPartner', (data) => {
        this.setState({ partner: false })
      })

      this.socket.on('partnerFound', (userId) => {
        this.setState({ partner: userId })
      })

      // Create component specific messages based on user actions
      if(!receiveEmitNames) {
        return
      }
      
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
          socket={ this.socket } 
          receivedData={ this.state }
        />
      )
    } 
  }

  return socketIOHOC
}