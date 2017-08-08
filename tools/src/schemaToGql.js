import schema from './schema';
import _ from 'lodash';

_.forEach(schema.properties, function(value, key) {
  console.log(key, value);
});

// _.forEach(schema.properties, function(value) {
//   console.log(value);
// });
