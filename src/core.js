import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  // Simplest thing we can possibly do to make the test pass:
  // Put the first two items in `entries` into `vote.pair`

  const entries = state.get('entries');

  // Map.merge: https://facebook.github.io/immutable-js/docs/#/Map/merge
  //  x.merge(y) => merges map y into map x, with y "winning all ties"
  return state.merge({
    vote: Map({
      // List.take: new list, but "take" only the first N
      pair: entries.take(2)
    }),
    // List.skip: new list, but "skip" the first N
    entries: entries.skip(2)
  });
}

export function vote(state, winner) {
 // Simplest thing...
 // Set vote.tally.${winner} = 1

 // updateIn reaches deep into nested data structures.
 return state.updateIn(['vote', 'tally', winner], 0, (val) => {
   return val+1;
 });
};
