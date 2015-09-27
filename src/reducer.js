import {Map, List} from 'immutable';
import {setEntries,next,vote, INITIAL_STATE} from '../src/core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      // Reducer composibility:
      // It is the reducer's responsibility to split up the state into smaller
      // chunks and hand it off.
      // More here: http://rackt.github.io/redux/docs/basics/Reducers.html
      return state.update('vote',
        voteState => vote(voteState, action.entry)
      );
    default:
      return state;
  }
}
