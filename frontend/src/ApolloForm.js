import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Form from 'react-jsonschema-form';

const log = (type) => console.log.bind(console, type);

const schema = {
  foo: "bar",
  type: "object",
  required: ["foo"],
  properties: {
    foo: {type: "string", title: "foo", default: "bar"},
  }
};

class ApolloForm extends Component {
  handleSubmit(e) {
    this.props.mutate({
      variables: { formData: JSON.stringify(e.formData) }
    })
    .then(({ data }) => {
      console.log('got data', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render() {    
    return (
        <Form schema={schema}
          onChange={log("changed")}
          onSubmit={this.handleSubmit.bind(this)}
          onError={log("errors")}
        />
    )
  }
}

const submitMutation = gql `
  mutation($formData: String!) {
    submit(input:$formData)
  }
`;

export default graphql(submitMutation)(ApolloForm);
