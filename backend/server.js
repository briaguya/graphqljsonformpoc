var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = [`
type Query {
  foo: String
}

type Mutation {
  bar(input: String): String 
}

schema {
  query: Query,
  mutation: Mutation
}`];

var resolvers = {
  Query: {
    foo(root) {
      return 'bar';
    }
  },
  Mutation: {
    bar(root, input) {
      return input.input;
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
