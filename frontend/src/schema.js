const schema = {
  foo: "bar",
  type: "object",
  required: ["foo"],
  properties: {
    foo: {type: "string", title: "foo", default: "bar"},
    bar: {type: "string", title: "bar", default: "foo"},
  }
};

export default schema;
