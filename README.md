# jbinto/redux-voting-server

Following [@teropa](https://twitter.com/teropa)'s "[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)", as of late Sept 2015.

## Usage

Run the tests:

```
npm run test --watch
```

## Gripes

* Running tests with `mocha` via `babel` makes it hard to pin down errors. Since the code is transpiled, and without source maps, there's no way to see what line caused an error.

* When testing immutable collections, `mocha` assertions generate intractable error messages, like this:

```
AssertionError: expected { Object (size, _root, ...) } to equal { Object (size, _root, ...) }
```

## Debugging mocha tests

```
npm install node-inspector
node-inspector
./node_modules/mocha/bin/mocha --compilers js:babel/register --recursive --debug-brk
open http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858
```

Source: http://stackoverflow.com/a/15884692/19779
