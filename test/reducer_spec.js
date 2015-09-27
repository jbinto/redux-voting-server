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

});
