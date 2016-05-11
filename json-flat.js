'use strict';

var fs = require('fs'),
  argv = require('minimist')(process.argv.slice(2)),
  isFromCLI = new RegExp('json-flat$').test(process.argv[1]);

module.exports = {
  flat: flat
};

/**
 * Obtains an array with all properties of a given JSON.
 * @param {string} json JSON file parsed.
 * @param {string} [.] separador Separator between each nested property.
 * @return {Array.<string>} Array with all properties parsed.
 */
function flat(json, separator) {
  var separator = separator || '.',
    data = JSON.parse(json) || {},
    result = [];

  /**
   * Saves into a result variable a concatenated property to be returned when
   * execution ends.
   * @param {string} prefix Prefix to concatenate a key.
   * @param {key} key Key to concatenate to the prefix.
   * @param {*} value Value of the key in the JSON.
   */
  function save(prefix, key, value) {
    var text = prefix + separator + key;

    // Remove
    result.push(text.replace(new RegExp('^\\' + separator), ''));
  }

  /**
   * Main function of the algorithm, loops through all properties concatenating
   * their names.
   * @param {*} data Data to continue looping through.
   * @param {string} [''] prefix Prefix to concatenate a key.
   */
  function internal(data, prefix) {
    var keys = Object.keys(data),
      prefix = prefix || '';

    // Loops all keys to concatenate them.
    keys.forEach(function(key) {
      var value = data[key],
        isObject = typeof value === 'object',
        isDate = value instanceof Date,
        isArray = value instanceof Array,
        // A property is deeper if it can be looped because it is an Object.
        isDeeper = isObject && !isDate && !isArray;

      isDeeper ? internal(value, prefix + separator + key) :
        save(prefix, key, value);
    });

    return result;
  }

  // Launch the function with JSON data parsed.
  return internal(data);
};

/**
 * Launches script from CLI. It reads the file and executes json-flat with its
 * data. When JSON is parsed, it prints in the console a concatenated property
 * per line.
 */
function fromCLI() {
  if (!argv.path) {
    console.log('Expected params: --path, --separator');
    process.exit(1);
  }

  flat(fs.readFileSync(argv.path), argv.separator).forEach(function(property) {
    console.log(property);
  });
}

// Check if launched from CLI. Check params and execute script.
isFromCLI && fromCLI();
