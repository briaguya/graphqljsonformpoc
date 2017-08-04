var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');
var cors = require('cors');

var typeDefs = [`
type Query {
  getSubmission(id: ID!): String
}

type Mutation {
  submit(input: String): String 
}

schema {
  query: Query,
  mutation: Mutation
}`];

var fakeDB = {};

var resolvers = {
  Query: {
    getSubmission(root, input) {
      return fakeDB[input.id];
    }
  },
  Mutation: {
    submit(root, input) {
      var id = require('crypto').randomBytes(10).toString('hex');
      fakeDB[id] = input.input;
      return id;
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
