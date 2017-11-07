import React, { Component } from 'react'
import { Header, Segment, Loader } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo'

import AuthForm from './AuthForm'
import UserLoggedIn from '../UserLoggedIn'

import GetUser from '../../queries/GetUser'
import LoginMutation from '../../mutations/Login'

class LoginForm extends Component {

  handleSubmit = (formData) => {
    const { username, password } = formData

    this.props.mutate({
      variables: { 
        email: username,
        password: password
      },
      refetchQueries: [{ query: GetUser }]
    }).then((data) => {
      console.log('data', data);
    })
  }

  render() {
    const { data } = this.props
    const { user, loading } = data

    if(loading) {
      return (<Loader active />)
    }

    if(user) {
      return (<UserLoggedIn user={ user }/>)
    }

    return(
      <Segment inverted>
        <Header as='h3'>
          Log in
        </Header>
        <AuthForm 
          handleSubmit={ this.handleSubmit } 
          submitBtnText='Log in' 
        />
      </Segment>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(LoginMutation)
)(LoginForm)