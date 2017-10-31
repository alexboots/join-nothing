import React, { Component } from 'react'
import { Container, Segment, Loader } from 'semantic-ui-react';

import { graphql } from 'react-apollo'

// Queries
import GetCurrentUser from '../queries/GetCurrentUser'
import LoginUser from '../queries/LoginUser'

class Header extends Component {

  render() {
    // const { loading } = this.props.data

    console.log('user', this.props.data)

    // if(loading) {
    //   return (<Loader active />)
    // }

    return (
      <div>
        header
      </div>
    )
  } 
}

export default graphql(LoginUser)(Header)