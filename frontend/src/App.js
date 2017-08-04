import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import client from './apolloClientService';
import { ApolloProvider } from 'react-apollo';

import ApolloForm from './ApolloForm';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloForm/>
      </ApolloProvider>
    );
  }
}

export default App;
