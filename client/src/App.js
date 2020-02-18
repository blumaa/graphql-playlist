import React, { Component } from "react";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
