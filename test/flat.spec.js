var expect = require('chai').expect,
  jsonFlat = require('../json-flat');

describe('json-flat', function() {
  it('should return a function', function() {
    expect(jsonFlat.flat).to.be.a.function;
  });

  it('should flat an empty JSON', function() {
    var _json = JSON.stringify({});

    expect(jsonFlat.flat(_json)).to.be.eql([]);
  });

  it('should flat a simple JSON with different values', function() {
    var _json = JSON.stringify({
        string: 'bar',
        number: 1,
        array: [1, 2, 3],
        date: new Date()
      });

    expect(jsonFlat.flat(_json)).to.eql(['string', 'number', 'array', 'date']);
  });

  it('should flat a nested JSON with different values', function() {
    var _json = JSON.stringify({
        foo: {
          bar: {
            string: 'bar',
            number: 1,
            array: [1, 2, 3],
            date: new Date()
          }
        }
      });

    expect(jsonFlat.flat(_json)).to.eql(['foo.bar.string', 'foo.bar.number',
      'foo.bar.array', 'foo.bar.date']);
  });

  it('should flat a complex nested JSON with different values', function() {
    var _json = JSON.stringify({
        foo: {
          bar: {
            string: 'bar',
            number: 1,
            array: [1, 2, 3],
            date: new Date(),
            object: {
              array: [4, 5, 6]
            }
          }
        }
      });

    expect(jsonFlat.flat(_json)).to.eql(['foo.bar.string', 'foo.bar.number',
      'foo.bar.array', 'foo.bar.date', 'foo.bar.object.array']);
  });

  it('should flat a complect nested JSON with a different separator',
    function() {
      var _json = JSON.stringify({
        foo: {
          bar: {
            string: 'bar',
            number: 1,
            array: [1, 2, 3],
            date: new Date(),
            object: {
              array: [4, 5, 6]
            }
          }
        }
      });

      expect(jsonFlat.flat(_json, '_')).to.eql(['foo_bar_string',
        'foo_bar_number', 'foo_bar_array', 'foo_bar_date',
        'foo_bar_object_array']);
    }
  );
});
