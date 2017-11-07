import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react';

import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'

import LoginMutation from '../mutations/Login'

class SignupForm extends Component {

  handleSubmit = (formData) => {
    const { username, password } = formData

    this.props.mutate({
      variables: { 
        email: username,
        password: password
      }
    }).then((data) => {
      console.log('data', data);
    })

    this.handleSubmit
  }

  render() {
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

export default graphql(LoginMutation)(SignupForm)