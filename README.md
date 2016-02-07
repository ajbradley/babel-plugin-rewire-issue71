Project used to illustrate bug  in peedskater/babel-plugin-rewire (babel-plugin-rewire 1.0.0. Beta 5).

There appears to be two issue. The first can be seen when compiling the source:
'
gulp
'
The generated log.js file (which has been run through babel 6) contains two TDZ errors. The generated code is:
'''javascript

exports.default = _get__("getLog"); // This calls _get__ which references _RewiredData which is block-scoped and not yet defined

...
if ((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(getLog)) {
...
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__); // This references _RewireAPI__ which is block-scoped and not yet defined
}

let _RewiredData__ = {};

function _get__(variableName) {
  return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
}
...
let _RewireAPI__ = {};
'''

Alternatively, if you run the unit test using:
'
npm test
'
you should see the generated error for the simple two-line unit test:
'
$npm test

> rewire-issue@1.0.0 test /path/to/rewire-issue
> mocha --compilers js:babel-register

/path/to/testIndex.js:20
  return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
         ^

ReferenceError: _RewiredData__ is not defined
    at _get__ (testIndex.js:2:16)
    at Object.<anonymous> (testIndex.js:2:16)
    at Module._compile (module.js:434:26)
    at loader (path/to/rewire-issue/node_modules/babel-register/lib/node.js:130:5)
'
