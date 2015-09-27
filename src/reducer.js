import {Map, List} from 'immutable';
import {setEntries,next,vote} from '../src/core';

export default function reducer(state, action) {
  if (!state) state = Map();

  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return Map();
  }
}
