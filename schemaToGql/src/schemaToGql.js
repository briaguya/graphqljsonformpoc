import schema from './schema';
import _ from 'lodash';
import fs from 'fs';

const typeStrings = {
  'string': 'String',
  'integer': 'Int',
  'number': 'Float',
  'boolean': 'Boolean'
};

var types = {};

function getObjectGql(objectSchema, addId = false, input = false) {
  var gql = "";

  if (addId) {
    gql += "  id: ID!\n";
  }

  _.forEach(objectSchema.properties, function(value, key) {
    if (value.type == 'array') {
      gql += "  " + key + ": [" + typeStrings[value.items.type] + "]\n";
    } else if (value.type == 'object') {
        if (input) {
          types["input " + value.title + "Input"] = getObjectGql(value);
          gql += "  " + key + ": " + value.title + "Input\n";
        } else {
          types["type " + value.title] = getObjectGql(value);
          gql += "  " + key + ": " + value.title + "\n";
        }
    } else {
      gql += "  " + key + ": " + typeStrings[value.type] + (_.includes(objectSchema.required, key) ? "!" : "") + "\n";
    };
  });

  return gql;
}

types["input FormSubmission"] = getObjectGql(schema, false, true);
types["type FormData"] = getObjectGql(schema, true);

var stream = fs.createWriteStream('formTypes.js');
stream.once('open', function(fd) {
  stream.write("module.exports = `\n");
  _.forEach(types, function(value, key) {
    stream.write(key + " {\n");
    stream.write(value + "}\n\n");
  });
  stream.write("`;");
  stream.end();
});

// var stream = fs.createWriteStream('formType.js');
// stream.once('open', function(fd) {
//   stream.write("module.exports = `\n");
//   _.forEach(schema.properties, function(value, key) {
//     if (value.type == 'array') {
//       stream.write(key + ": [" + typeStrings[value.items.type] + "]\n");
//     } else if (value.type == 'object') {
//       console.log(value);
//     } else {
//       stream.write(key + ": " + typeStrings[value.type] + (_.includes(schema.required, key) ? "!" : "") + "\n");
//     };
//   });
//   stream.write("`;");
//   stream.end();
// });
