import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import GetUser from '../queries/GetUser'

import { SignupRoute } from '../routes'

export default (WrapperComponent) => {
  class requireAuthHOC extends Component {

    componentWillUpdate(nextProps) {
      // Redirect user to signup screen if not signed in

      if(!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push(SignupRoute)
      }
    }

    render() {
      if(this.props.data.user) {
        return (<WrapperComponent { ...this.props } />)
      } else {
        // don't try and resolve component
        return null
      }
    } 
  }

  return graphql(GetUser)(requireAuthHOC)
}