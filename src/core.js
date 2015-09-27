import {List, Map, fromJS} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  console.log(`enter getWinners; vote=${vote}`);
  if (!vote) return [];

  // ES6 destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const [aName, bName] = vote.get('pair');
  const a = vote.getIn(['tally', aName], 0);
  const b = vote.getIn(['tally', bName], 0);

  console.log(`getWinners: a=${a} b=${b}`);

  if (a > b) return [aName];
  if (b > a) return [bName];
  if (a == b) return [aName,bName];

  // impossible... ?
  return [];

}

export function next(state) {
  // Simplest thing we can possibly do to make the test pass:
  // 1) Put the first two items in `entries` into `vote.pair`,
  // 2) Generate an array of winner(s),
  // 3) If we're at the last one, show a winner.

  const vote = state.get('vote');
  const entries = state.get('entries')
                   .concat(getWinners(vote));


  if (entries.size === 1) {
    return state
      .remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }

  // Map.merge: https://facebook.github.io/immutable-js/docs/#/Map/merge
  //  * x.merge(y) => merges map y into map x, with y "winning all ties"
  //  * List.take: new list, but "take" only the first N
  //  * List.skip: new list, but "skip" the first N

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

export function vote(state, winner) {
 // Simplest thing...
 // Set vote.tally.${winner} += 1

 // updateIn reaches deep into nested data structures.
 // It will recursively generate any missing keys.
 // 0 is the default number if not present.
 return state.updateIn(['vote', 'tally', winner], 0, (val) => {
   return val+1;
 });
};
