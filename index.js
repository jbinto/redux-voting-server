// index.js is the entry point of our server application.
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

// Now that the server is started, populate it with some default entries.
//  n.b. Really neat to see that you can `require` a JSON file like this.
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

store.dispatch({
  type: 'NEXT'
});
