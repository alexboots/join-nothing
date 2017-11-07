import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Header, Segment } from 'semantic-ui-react';

import ApolloClient from 'apollo-client'
import GetUser from '../queries/GetUser'

class UserLoggedIn extends Component {
  render() {
    const { data } = this.props
    const { user } = data

    if(user) {
      return(
        <Segment inverted>
          <Header as='h3'>
            Hi { user.email }
          </Header>
          <p>There is nothing here</p>
        </Segment>
      )
    } else {
      return null
    }
  }
}

export default graphql(GetUser)(UserLoggedIn)