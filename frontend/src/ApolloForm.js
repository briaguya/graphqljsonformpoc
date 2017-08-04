import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Form from 'react-jsonschema-form';
import schema from './schema';

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

  render() { return ( <Form schema={schema} onSubmit={this.handleSubmit.bind(this)} /> ) }
}

const submitMutation = gql `
  mutation($formData: String!) {
    submit(input:$formData)
  }
`;

export default graphql(submitMutation)(ApolloForm);
