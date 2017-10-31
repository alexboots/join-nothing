// React
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'


// Components
import App from './components/App'


const client = new ApolloClient({ 
  link: new HttpLink(),
  cache: new InMemoryCache()
})

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
