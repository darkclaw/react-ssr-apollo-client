import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import App from './components/App';
import { GRAPHQL_URI } from './config';

const link = createHttpLink({ 
  uri: GRAPHQL_URI
});
const cache = new InMemoryCache().restore(typeof window === 'undefined' ? {} : window.__APOLLO_STATE__);
const client = new ApolloClient({
  link,
  credentials: 'same-origin',
  cache
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
