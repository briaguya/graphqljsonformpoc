var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');
var cors = require('cors');

var typeDefs = [`
input FormSubmission {
  foo: String
  bar: String
}

type FormData {
  id: ID!
  foo: String
  bar: String
}

type Query {
  getFormData(id: ID!): FormData
}

type Mutation {
  submit(input: FormSubmission): FormData
}

schema {
  query: Query,
  mutation: Mutation
}`];

var fakeDB = {};

var resolvers = {
  Query: {
    getFormData(root, input) {
      return fakeDB[input.id];
    }
  },
  Mutation: {
    submit(root, input) {
      var id = require('crypto').randomBytes(10).toString('hex');
      input.input.id = id;
      fakeDB[id] = input.input;
      return fakeDB[id];
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
