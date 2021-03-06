import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Loader, Grid } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo'

// Queries
import GetUser   from '../queries/GetUser'
import Login from '../mutations/Login'
import Logout    from '../mutations/Logout'

import { 
  HomeRoute, 
  LoginRoute, 
  SignupRoute, 
  DashboardRoute,
  GameRoute,
  WordCountRoute
} from '../routes'

class Header extends Component {

  handleLogout = () => {
    this.props.mutate({
      refetchQueries: [{ query: GetUser }]
    }).then(response => {
      this.props.history.push(HomeRoute)
    })
  }

  renderButtonsAllUsersSee () {
    return (
      <span>
        <Link to={ HomeRoute }>
          <Button inverted>
            Home
          </Button>
        </Link>
        <Link to={ GameRoute }>
          <Button inverted>
            Something
          </Button>
        </Link>
        <Link to={ WordCountRoute }>
          <Button inverted>
            Count Words
          </Button>
        </Link>
      </span>
    )
  }

  renderDashboardButton () {
    const { user } = this.props.data 

    if(user) {
      return (
        <Link to={ DashboardRoute }>
          <Button inverted>
            Dashboard
          </Button>
        </Link>
      )
    }
  }

  renderActionButtons() {
    const { user } = this.props.data 

    if(user) {
      return (
        <Grid.Column textAlign='right'>
          <Button 
            inverted 
            onClick={ this.handleLogout }
          >
            Log Out
          </Button>
        </Grid.Column>
      )
    } else {
      return (
        <Grid.Column textAlign='right'> 
          <Link to={ SignupRoute }>
            <Button 
              inverted
              className='btn-nav-sign-up'
            >
              Sign Up
            </Button>
          </Link>
          <Link to={ LoginRoute }>
            <Button inverted>
              Log In
            </Button>
          </Link>
        </Grid.Column>
      )
    }
  }

  render() {
    const { loading, user } = this.props.data

    if(loading) {
      return (<Loader active />)
    }

    return (
      <Grid padded columns={ 2 }>
        <Grid.Row>
          <Grid.Column>
            { this.renderButtonsAllUsersSee() }
            { this.renderDashboardButton() }
          </Grid.Column>
          
          { this.renderActionButtons() }
        </Grid.Row>
      </Grid>
    )
  }
}

export default compose(
  graphql(GetUser),
  graphql(Logout)
)(Header)