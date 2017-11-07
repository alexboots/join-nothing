import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Header, Segment } from 'semantic-ui-react';

import ApolloClient from 'apollo-client'
import GetUser from '../queries/GetUser'

class UserLoggedIn extends Component {
  render() {
    console.log('this.props', this.props);

    const { user } = this.props

    return(
      <Segment inverted>
        <Header as='h3'>
          Hi { user.email }
        </Header>
      </Segment>
    )
  }
}

export default UserLoggedIn