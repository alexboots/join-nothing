import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Container, Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    const { children } = this.props
    
    return (
      <Container>
        <Segment inverted>
          { children }
        </Segment>
      </Container>
    )
  } 
}

export default App