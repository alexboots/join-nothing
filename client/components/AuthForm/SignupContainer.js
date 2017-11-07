import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react';

import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'

import SignupMutation from '../../mutations/Signup'

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
  }

  render() {
    return(
      <Segment inverted>
        <Header as='h3'>
          Sign up
        </Header>
        <AuthForm 
          handleSubmit={ this.handleSubmit } 
          submitBtnText='Sign Up' 
        />
      </Segment>
    )
  }
}

export default graphql(SignupMutation)(SignupForm)