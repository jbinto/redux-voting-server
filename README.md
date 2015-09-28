# jbinto/redux-voting-server

This is a Babel / Socket.io / Redux / Immutable.js backend for [jbinto/redux-voting-client](https://github.com/jbinto/redux-voting-client).

I am following [@teropa](https://twitter.com/teropa)'s "[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)", as of late Sept 2015.

## Usage

### Starting socket.io server

```
npm run start
```

### Running tests

```
npm run test --watch
```

### Interacting with the store in the REPL

```
$ babel-node
> const store = require('./index').store;
```


## Gripes / lessons learned / thoughts / questions

* Running tests with `mocha` via `babel` makes it hard to pin down errors. Since the code is transpiled, and without source maps, there's no way to see what line caused an error.

* When testing immutable collections, `mocha` assertions generate intractable/useless error messages, like this:

```
AssertionError: expected { Object (size, _root, ...) } to equal { Object (size, _root, ...) }
```

* Eventually I had to resort to debugging a mysteriously failing Mocha test. You can do so with the Chrome debugger using `node-inspector`.

```
npm install node-inspector
node-inspector
./node_modules/mocha/bin/mocha --compilers js:babel/register --recursive --debug-brk
open http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858
```

(Source: http://stackoverflow.com/a/15884692/19779)

The debugger will appear inside mocha. Hit F8 to advance. It will break at any `debugger` statement inside your code.

Using the console is a bit laggy. At first I didn't think it was working, but you have to give it 1-2 seconds when you enter an expression.


* Immutable collections are pretty awkward to work with at first, and still feel like magic. So I can keep copies at will on each mutation, and not worry about excessive memory usage due to naively keeping copies? Apparently. But how do I verify that?

* Reducers appear really obviously beneficial at first: your entire application state is declarative. But this seems like it would be more difficult/awkward when applications get bigger: giant global state variables being passed around all the time. (**edit:** This is what reducer composibility is for.)
