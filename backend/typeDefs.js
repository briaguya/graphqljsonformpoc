module.exports = [`
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
