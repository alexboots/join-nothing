import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import App from './components/App'

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
      <Router>
        <Route exact path="/" component={ App } />
        

      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

// import React from 'react';
// import ReactDOM from 'react-dom';

// import ApolloClient from 'apollo-client'
// import { ApolloProvider } from 'react-apollo'
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// import Header from './components/Header'

// const link = createHttpLink({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin',
//   },
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link
// });

// const Root = () => {
//   return (
//     <ApolloProvider client={ client }>
//       <Header />
//     </ApolloProvider>
//   )
// }

// ReactDOM.render(<Root />, document.querySelector('#root'));


