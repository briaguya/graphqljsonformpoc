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

function getGqlLine(value, key, required, input, isFixedArray) {
  if(isFixedArray) {
    var line =
      "  " + key + ": " +
      value.title +
      (input ? "Input" : "") +
      (required ? "!" : "") +
      "\n";

    return line;
  }

  var line =
    "  " + key + ": " +
    (value.type == 'array' ? "[" : "") +
    (value.type == 'object' ?
      value.title :
      (value.type == 'array' ?
        (value.items.type == 'object' ?
          value.items.title :
          typeStrings[value.items.type]) : 
        typeStrings[value.type])) +
    (input ? "Input" : "") +
    (required ? "!" : "") +
    (value.type == 'array' ? "]" : "") +
    "\n";
  return line;
}

function fixedArrayToObject(fixedArray) {
  var count = 0;
  var props = _.keyBy(fixedArray.items, function() {
    return (count++).toString();
  });

  return {
    type: fixedArray.type,
    title: fixedArray.title,
    properties: props
  };
}

function getObjectGql(objectSchema, addId = false, input = false) {
  var gql = "";

  if (addId) {
    gql += "  id: ID!\n";
  }

  _.forEach(objectSchema.properties, function(value, key) {
    var isObject = value.type == 'object' || (value.items != null && value.items.type == 'object');
    var isFixedArray = value.type == 'array' && _.isArray(value.items);

    gql += getGqlLine(value, key, _.includes(objectSchema.required, key), input && (isObject || isFixedArray), isFixedArray);
    
    if (value.type == 'object') {
      types[(input ? "input " : "type ") + value.title + (input ? "Input" : "")] = getObjectGql(value);
      return;
    };

    if (value.type == 'array' && isObject && !isFixedArray) {
      types[(input ? "input " : "type ") + value.items.title + (input ? "Input" : "")] = getObjectGql(value.items);
      return;
    };

    if (isFixedArray) {
      types[(input ? "input " : "type ") + value.title + (input ? "Input" : "")] = getObjectGql(fixedArrayToObject(value));
      return;
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
