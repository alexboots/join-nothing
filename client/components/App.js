import React, { Component } from 'react'

import { Container, Segment } from 'semantic-ui-react';

import Header from './Header'



class App extends Component {
  render() {
    const { children } = this.props
    

    return (
      <div>
        <Header />
      </div>
    )
  } 
}

export default App