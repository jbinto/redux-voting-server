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
