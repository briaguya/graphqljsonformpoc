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
    stream.write(key + ": " + typeStrings[value.type] + (_.includes(schema.required, key) ? "!" : "") + "\n");
  });
  stream.write("`;");
  stream.end();
});
