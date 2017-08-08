var formTypes = require('./formTypes');

module.exports = [formTypes + `

type Query {
  submission(id: ID!): FormData
  submissions: [FormData]
}

type Mutation {
  submit(input: FormSubmission): FormData
}

schema {
  query: Query,
  mutation: Mutation
}`];
