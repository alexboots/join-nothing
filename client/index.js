import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'


cost client = new ApolloClient({ 
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider>
      HELLO
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
