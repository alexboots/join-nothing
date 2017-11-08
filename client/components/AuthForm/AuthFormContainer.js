import React, { Component } from 'react'
import { Header, Segment, Loader } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo'

import AuthForm from './AuthForm'

import GetUser from '../../queries/GetUser'
import LoginMutation from '../../mutations/Login'
import SignupMutation from '../../mutations/Signup'

import { DashboardRoute, LoginRoute, SignupRoute } from '../../routes'

class AuthFormContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: [],
      loginForm: (props.match.url === LoginRoute) ?  true : false,
      signupForm: (props.match.url === SignupRoute) ?  true : false
    }
  }

  componentWillUpdate(nextProps) {
    if(!this.props.data.user && nextProps.data.user) {
      this.props.history.push(DashboardRoute)
    }
  }

  handleSubmit = (formData) => {
    const { username, password } = formData

    let mutationToPerform

    if(this.state.loginForm) {

      mutationToPerform = 'LoginMutation'

    } else if(this.state.signupForm) {

      mutationToPerform = 'SignupMutation'

    } else {

      console.error('Uhhhmmmmm this route does not have a form associated with it!')
      return null
    }

    this.props[mutationToPerform]({
      variables: { 
        username: username,
        password: password
      },
      refetchQueries: [{ query: GetUser }]
    })
    .catch(error => {
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

    let formText
    if(this.state.loginForm) {
      formText = 'Log in'
    } else if(this.state.signupForm) {
      formText = 'Sign up'
    }

    return(
      <Segment inverted>
        <Header as='h3'>
          { formText }
        </Header>
        <AuthForm 
          loginForm={ this.state.loginForm }
          handleSubmit={ this.handleSubmit } 
          submitBtnText={ formText }
          errors={ this.state.errors }
        />
      </Segment>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(LoginMutation, { name: 'LoginMutation' }),
  graphql(SignupMutation, { name: 'SignupMutation' })
)(AuthFormContainer)