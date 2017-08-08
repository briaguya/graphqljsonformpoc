var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');
var cors = require('cors');
var _ = require('lodash');
var typeDefs = require('./typeDefs');

var fakeDB = {submissions:{}};

var resolvers = {
  Query: {
    submission: (_, {id}) => fakeDB.submissions[id],
    submissions: () => _.values(fakeDB.submissions),
  },
  Mutation: {
    submit(root, input) {
      var id = require('crypto').randomBytes(10).toString('hex');
      input.input.id = id;
      fakeDB.submissions[id] = input.input;
      return fakeDB.submissions[id];
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
