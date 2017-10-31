// React
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'

// Components
import App from './components/App'

// https://www.apollographql.com/docs/react/recipes/authentication.html
const link = createHttpLink({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <BrowserRouter>
         <Route exact path="/" component={ App } />
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
