// React
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// Apollo
import ApolloClient from 'apollo-client'
import { createHttpLink, HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'

// Components
import App from './components/App'
import Header from './components/Header'

// https://www.apollographql.com/docs/react/recipes/authentication.html
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <Header />
    </ApolloProvider>
  );
};

// const Root = () => {
//   return (
//     <ApolloProvider client={ client }>
//       <BrowserRouter>
//          <Route exact path="/" component={ App } />
//       </BrowserRouter>
//     </ApolloProvider>
//   );
// };

ReactDOM.render(<Root />, document.querySelector('#root'));
