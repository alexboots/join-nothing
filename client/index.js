import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { 
  HomeRoute, 
  DashboardRoute, 
  LoginRoute, 
  SignupRoute, 
  GameRoute, 
  RelaxRoute,
  WordCountRoute 
} from './routes'

import App from './components/App'
import Navbar from './components/Navbar'

import AuthFormContainer from './components/AuthForm/AuthFormContainer'
import Dashboard from './components/Dashboard'
import LevelContainer from './components/Game/LevelContainer'

import RelaxContainer from './components/Relax/RelaxContainer'

// Higher Order Components
import requireAuthHOC from './components/requireAuthHOC'

import ScrabbleBoard from './components/Scrabble/Board'

import WordCount from './components/WordCount'

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
          <Route path={ LoginRoute } component={ AuthFormContainer } />
          <Route path={ SignupRoute } component={ AuthFormContainer } />

          <Route path={ GameRoute } component={ LevelContainer } />
          <Route path={ RelaxRoute } component={ RelaxContainer } />

          <Route path={ '/scrabble' } component={ ScrabbleBoard } />

          <Route path={ WordCountRoute } component={ WordCount } />
        </App>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'));


