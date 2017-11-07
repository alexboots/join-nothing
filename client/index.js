import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import routes from './routes'
const { Signup, Logout, Login } = routes

import App from './components/App'
import Navbar from './components/Navbar'
import LoginContainer from './components/AuthForm/LoginContainer'
import SignupContainer from './components/AuthForm/SignupContainer'


const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <BrowserRouter>
        <App>
          <Navbar />
          <Route path={ Login } component={ LoginContainer } />
          <Route path={ Signup } component={ SignupContainer } />
          { /* Todo: Add catch all / 404 path because server doens't hadnle routes */ }
        </App>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'));


