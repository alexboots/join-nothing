import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react';


import Peer from 'simple-peer'



class RelaxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      signal: 'hi'
    }

    this.p = new Peer({ initiator: location.hash === '#1', trickle: false })

    this.p.on('error', (err) => { console.log('error', err) })

    this.p.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data))
      this.updateSignal(data)
    })

    this.p.on('connect', () => {
      console.log('CONNECT')
      this.p.send('whatever' + Math.random())
    })

    this.p.on('data', (data) => {
      console.log('data: ' + data)
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log('SUBMIYTTINNNGG', JSON.stringify(this.state.value));
    this.p.signal( JSON.parse(this.state.value))
  }

  updateSignal = (data) => {
    this.setState({ signal: JSON.stringify(data) })
  }

  render() {
    const divStyle = {
      color: 'white',
      width: '600px', 
      wordWrap: 'break-word'
    }

    return(
      <Segment 
        inverted 
        className="dashboard"
      >
        <form onSubmit={ this.onSubmit }>
          <textarea id="incoming" onChange={ (e) => { this.setState({value: e.target.value }) } }></textarea>
          <button type="submit">submit</button>
        </form>


        <div id="outgoing" style={divStyle}>{ this.state.signal }</div>
      </Segment>
    )
  }
}

export default RelaxContainer