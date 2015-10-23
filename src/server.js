import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // Subscribe to the Redux store.
  //
  // Whenever our application state changes, we will send
  // the entire state to all connected websocket clients.
  //
  // This could certainly be optimized further.

  store.subscribe(
    // Using top level `io.emit` emits to all clients
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    // Respond to 'action' by passing it directly to store.dispatch()
    const dispatch = store.dispatch.bind(store);
    socket.on('action', dispatch);

    // Give new clients the state.
    console.log('new websocket connection, providing state');
    socket.emit('state', store.getState().toJS());
  });
}
