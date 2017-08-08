import schema from './schema';
import _ from 'lodash';
import fs from 'fs';

const typeStrings = {
  'string': 'String',
  'integer': 'Int',
  'number': 'Float',
  'boolean': 'Boolean'
};

var stream = fs.createWriteStream('formType.js');

stream.once('open', function(fd) {
  stream.write("module.exports = `\n");
  _.forEach(schema.properties, function(value, key) {
    if(value.type == 'array') {
      console.log(value);
      stream.write(key + ": [" + typeStrings[value.items.type] + (_.includes(schema.required, key) ? "!" : "") + "]\n");
    } else {
      stream.write(key + ": " + typeStrings[value.type] + (_.includes(schema.required, key) ? "!" : "") + "\n");
    };
  });
  stream.write("`;");
  stream.end();
});
