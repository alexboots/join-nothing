import React, { Component } from 'react'
import { Header, Segment, Loader } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo'

import AuthForm from './AuthForm'
import UserLoggedIn from '../UserLoggedIn'

import GetUser from '../../queries/GetUser'
import SignupMutation from '../../mutations/Signup'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  handleSubmit = (formData) => {
    const { username, password } = formData
    this.props.mutate({
      variables: { 
        email: username,
        password: password
      },
      refetchQueries: [{ query: GetUser }]
    }).catch(error => {
      const { graphQLErrors } = error
      
      let errors = graphQLErrors.map((error) => {
        return error.message
      });

      this.setState({ errors })
    })
  }

  render() {
    const { data } = this.props
    const { user, loading } = data

    if(loading) {
      return (<Loader active />)
    }

    if(user) {
      return null
    }


    return(
      <Segment inverted>
        <Header as='h3'>
          Sign up
        </Header>
        <AuthForm 
          handleSubmit={ this.handleSubmit } 
          submitBtnText='Sign Up' 
          errors={ this.state.errors }
        />
      </Segment>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(SignupMutation)
)(SignupForm)