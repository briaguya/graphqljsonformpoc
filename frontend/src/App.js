import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from "react-jsonschema-form";

const schema = {
  foo: "bar",
  type: "object",
  required: ["foo"],
  properties: {
    foo: {type: "string", title: "foo", default: "bar"},
  }
};

const log = (type) => console.log.bind(console, type);

class App extends Component {
  render() {
    return (
      <Form schema={schema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")} />
        );
  }
}

export default App;
