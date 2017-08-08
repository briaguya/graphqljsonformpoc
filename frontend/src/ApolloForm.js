import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Form from 'react-jsonschema-form';
import schema from './schema';

class ApolloForm extends Component {
  state = {
    submissionId: null
  }

  handleSubmit(e) {
    this.props.mutate({
      variables: { formSubmission: e.formData }
    })
    .then(({ data }) => {
      this.setState({submissionId: data.submit.id});
      console.log('got data', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render() { return (
    <div>
      <Form schema={schema} onSubmit={this.handleSubmit.bind(this)} /> 
      <div>
        submissionId: {this.state.submissionId}
      </div>
    </div>
  )}
}

const submitMutation = gql `
  mutation($formSubmission: FormSubmission) {
    submit(input:$formSubmission) {
      id
    }
  }
`;

export default graphql(submitMutation)(ApolloForm);
