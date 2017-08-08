const schema = {
  Title: "Title of the Form",
  type: "object",
  required: ["required"],
  properties: {
    string: {type: "string", title: "String", default: "Six"},
    integer: {type: "integer", title: "Integer", default: 6},
    number: {type: "number", title: "Number (Float)", default: 0.6},
    boolean: {type: "boolean", title: "Boolean", default: true},
    required: {type: "string", title: "Required", default: "Required"},
  }
};

export default schema;
