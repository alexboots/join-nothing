import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { HomeRoute, DashboardRoute, LoginRoute, SignupRoute } from './routes'

import App from './components/App'
import Navbar from './components/Navbar'
import LoginContainer from './components/AuthForm/LoginContainer'
import SignupContainer from './components/AuthForm/SignupContainer'
import Dashboard from './components/Dashboard'

import requireAuthHOC from './components/requireAuthHOC'

import GetUser from './queries/GetUser'

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <BrowserRouter>
        <App>
          <Route path={ HomeRoute } component={ Navbar } />
          
          <Route path={ DashboardRoute } component={ requireAuthHOC(Dashboard) } />
          <Route path={ LoginRoute } component={ LoginContainer } />
          <Route path={ SignupRoute } component={ SignupContainer } />
        </App>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'));


