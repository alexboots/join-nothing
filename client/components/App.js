import React, { Component } from 'react'

import { Container, Segment } from 'semantic-ui-react';

import Navbar from './Navbar'

class App extends Component {
  render() {
    const { children } = this.props
    

    return (
      <Container>
        <Segment inverted>
          <Navbar />
          { children }
        </Segment>
      </Container>
    )
  } 
}

export default App