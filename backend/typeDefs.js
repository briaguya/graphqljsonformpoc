var formType = require('./formType');

module.exports = [`
input FormSubmission {` +
formType
+ `}

type FormData {
  id: ID!` +
formType
+ `}

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
