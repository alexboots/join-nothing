import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react';

import AuthForm from './AuthForm'

import LoginMutation from '../mutations/Login'

class SignupForm extends Component {

  handleSubmit = () => {
    this.handleSubmit
  }

  render() {
    return(
      <Segment inverted>
        <Header inverted as='h3'>
          Sign in
        </Header>
        <AuthForm 
          handleSubmit={ this.handleSubmit } 
          submitBtnText='Sign Up'
        />
      </Segment>
    )
  }
}

export default SignupForm