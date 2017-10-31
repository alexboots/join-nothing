import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Container, Segment } from 'semantic-ui-react';

import Header from './Header'

import routes from '../routes'


class App extends Component {
  someComponent = () => {
    return(<div>asdf { Math.random() }</div>)
  }
  render() {
    const { children } = this.props
    const { Home, Signup, Logout, Login } = routes

    return (
      <div>
        <Header />
        <Route path={ Login } component={ this.someComponent } />
        <Route path={ Signup } component={ this.someComponent } />
        <Route path={ Logout } component={ this.someComponent } />
      </div>
    )
  } 
}

export default App