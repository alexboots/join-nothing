import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Loader, List } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo'

// Queries
import GetUser   from '../queries/GetUser'
import Login from '../mutations/Login'
import Logout    from '../mutations/Logout'

import routes from '../routes'


class Header extends Component {

  handleLogin = () => {

  }

  handleLogout = () => {
    this.props.mutate({
      refetchQueries: [{ query: GetUser }]
    }).then(response => {
      console.log('response', response)
    })
  }

  handleSignUp = () => {

  }

  renderButtons() {
    const { user } = this.props.data 
    const { Home, Signup, Logout, Login } = routes

    if(user) {
      return (
        <Link to={ Logout }>
          <List.Item>
            <Button onClick={ this.handleLogout }>
              Log Out
            </Button>
          </List.Item>
        </Link>
      )
    } else {
      return (
        <div>
          <Link to={ Login }>
            <List.Item>
              <Button>
                Log In
              </Button>
            </List.Item>
          </Link>

          <Link to={ Signup }>
            <List.Item>
              <Button>
                Sign Up
              </Button>
            </List.Item>
          </Link>
        </div>
      )
    }
  }

  render() {
    const { loading } = this.props.data

    if(loading) {
      return (<Loader active />)
    }

    console.log('this.props.data', this.props.data);

    return (
      <List link horizontal>
        <Link to="/">
          <List.Item active>
            <Button>Home</Button>
          </List.Item>
        </Link>

        { this.renderButtons() }
      </List>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(Logout)
)(Header)