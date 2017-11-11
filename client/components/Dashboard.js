import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Header, Segment } from 'semantic-ui-react';

import ApolloClient from 'apollo-client'
import GetUser from '../queries/GetUser'

class LoggedIn extends Component {
  handleClick = () => {

    console.log('click');
  }

  render() {
    const { data } = this.props
    const { user } = data

    return(
      <Segment 
        inverted 
        onClick={ this.handleClick } 
        className="dashboard"
      >
        <Header as='h3'>
          Hi { user.username }
        </Header>
        <p>There is nothing here</p>
      </Segment>
    )
  }
}

export default graphql(GetUser)(LoggedIn)