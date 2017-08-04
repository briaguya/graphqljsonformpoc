const schema = {
  foo: "bar",
  type: "object",
  required: ["foo"],
  properties: {
    foo: {type: "string", title: "foo", default: "bar"},
  }
};

export default schema;
