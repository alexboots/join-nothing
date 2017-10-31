import React, { Component } from 'react'
import { Container, Segment, Loader } from 'semantic-ui-react';

import { graphql } from 'react-apollo'

import GetCurrentUser from '../queries/GetCurrentUser'

class Header extends Component {

  render() {
    const { loading } = this.props.data
    if(loading) {
      return (<Loader active />)
    }

    console.log('asdfg', this.props.data);
    return (
      <div>
        header
      </div>
    )
  } 
}

export default graphql(GetCurrentUser)(Header)