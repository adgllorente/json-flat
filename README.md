# json-flat
Flatters any JSON properties returning an array of concatenated properties.

[![npm version](https://badge.fury.io/js/json-flat.png)](https://badge.fury.io/js/json-flat)
[![Build Status](https://travis-ci.org/adgllorente/json-flat.svg?branch=master)](https://travis-ci.org/adgllorente/json-flat)
![Dependencies status](https://david-dm.org/adgllorente/json-flat.svg)
[![Donate please](https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_74x21.png)](https://www.paypal.me/adgllorente/1)

# Usage
This module might be used from CLI or requiring it.

## From CLI
This module might be used from CLI. It parses a given JSON file and returns a list of properties concatenated. Expects these parameters:
- ``--path``: Path to a JSON file.
- ``--separator`` *(Optional)*: Separator to be used to concatenate properties

```shell
$> node json-flat --path ./test.json
foo.bar
foo.bar.string

$> node json-flat --path ./test.json --separator _
foo_bar
foo_bar_string
```

## From require
This module might be imported in other module using ``require``. It parses a given JSON Object and returns an array with all properties concatenated, for example:

```js
var jsonFlat = require('./json-flat'),
  _json = JSON.stringify({
    foo: {
      number: 1,
      bar: {
        string: 'Hello World'
      }
    }
  });

// With default separator
jsonFlat.flat(_json).forEach(function(property) {
  console.log(property);
});
// Prints:
//   foo.number
//   foo.bar.string

// With a given separator
jsonFlat.flat(_json, '_').forEach(function(property) {
  console.log(property);
});
// Prints:
//   foo_number
//   foo_bar_string
```
