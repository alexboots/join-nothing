import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Loader, Grid } from 'semantic-ui-react';

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
    const { Login, Signup, Logout } = routes

    if(user) {
      return (
        <Grid.Column textAlign='right'>
          <Link to={ Logout }>
            <Button 
              inverted 
              onClick={ this.handleLogout }
            >
              Log Out
            </Button>
          </Link>
        </Grid.Column>
      )
    } else {
      return (
        <Grid.Column textAlign='right'> 
          <Link to={ Signup }>
            <Button inverted>
              Sign Up
            </Button>
          </Link>
          <Link to={ Login }>
            <Button inverted>
              Log In
            </Button>
          </Link>
        </Grid.Column>
      )
    }
  }

  render() {
    const { loading } = this.props.data
    const { Home } = routes


    if(loading) {
      return (<Loader active />)
    }

    return (
      <Grid padded columns={ 2 }>
        <Grid.Row>
          <Grid.Column>

            <Link to={ Home }>
              <Button inverted>
                Home
              </Button>
            </Link>

          </Grid.Column>
          
          { this.renderButtons() }
        </Grid.Row>
      </Grid>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(Logout)
)(Header)