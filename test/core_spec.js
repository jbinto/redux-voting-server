import {List,Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

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

  });

});
