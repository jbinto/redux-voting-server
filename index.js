// index.js is the entry point of our server application.
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer();
