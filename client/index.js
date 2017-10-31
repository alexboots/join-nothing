import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import Header from './components/Header'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  networkInterface,
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <Header />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
