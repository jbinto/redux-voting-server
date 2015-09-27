import {List,Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

  // This is basically a fancy, immutable way of saying
  // BIG_GLOBAL_VARIABLE = ...

  //

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      // initialize an empty state
      const state = Map();

      const entries = List.of('Toronto', 'Montréal');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Toronto', 'Montréal')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Toronto', 'Chicago'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Toronto', 'Chicago')
      }));
    })

  });

  // 'next' is what advances the vote.
  // Don't forget, we're working with immutables here.
  // We need to "reconstruct" the entire state tree every time we mutate it.
  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Toronto', 'Chicago', 'Boston')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Toronto', 'Chicago')
        }),
        entries: List.of('Boston')
      }));
    });
  });

});