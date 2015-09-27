import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
// n.b. no curly-braces here, since the function is exported as `default`
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    // Setting state to undefined proves that the reducer can initiate it's own state.
    const state = undefined;
    const action =
      { type: 'SET_ENTRIES', entries: ['Toronto', 'Chicago'] };
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({
      entries: ['Toronto', 'Chicago']
    }));
  });

  it('handles NEXT', () => {
    const state = fromJS({
      entries: ['Toronto', 'Chicago']
    });
    const action = { type: 'NEXT' };
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Toronto', 'Chicago']
      },
      entries: [],
    }));
  });

  it('handles VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['Toronto', 'Vancouver'],
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Toronto' };
    const newState = reducer(state, action);

    const tally = newState.getIn(['vote', 'tally', 'Toronto']);
    expect(tally).to.equal(1);

  });

  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Toronto', 'Chicago'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Toronto' },
      { type: 'VOTE', entry: 'Chicago' },
      { type: 'VOTE', entry: 'Toronto' },
      { type: 'NEXT' }
    ];

    const finalState = actions.reduce(reducer, Map());

    // That's why it's called a reducer.  Mind blown.
    // Very neat to see it zip through events like this.
    //
    // MDN: "[reducer] applies a function against an accumulator and each value
    // of the array (from left-to-right) to reduce it to a single value."
    expect(finalState).to.equal(fromJS({
      winner: 'Toronto'
    }));

  });

});
