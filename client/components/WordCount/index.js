import React, { Component } from 'react'
import { Segment, Form, TextArea } from 'semantic-ui-react';


import Peer from 'simple-peer'



class WordCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: 0
    }
  }

  changeWordCount = (e) => {
    if(e && e.target && e.target.value) {
      let wordCount = 0
      const words = e.target.value.split(" ").forEach(word => {
        if(word.length) {
          wordCount++
        }
      })

      this.setState({
        words: wordCount
      })
    }
  }

  render() {
    return(
      <Segment 
        inverted 
        className="dashboard"
      >
        <Form>
          <TextArea 
            placeholder=':)' 
            onKeyUp={ this.changeWordCount }
          />
        </Form>
        <div>{ this.state.words } words</div>
      </Segment>
    )
  }
}

export default WordCount