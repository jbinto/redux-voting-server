import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    })

  });


  describe('a list', () => {
    function addCity(currentState, city) {
      // Immutable.js always returns new, mutated objects.
      return currentState.push(city);
    }

    it('is immutable', () => {
      let state = List.of('Toronto', 'Calgary');
      let nextState = addCity(state, 'Vancouver');

      // The original list hasn't been changed.
      expect(state).to.equal(List.of(
        'Toronto',
        'Calgary'
      ));

      expect(nextState).to.equal(List.of(
        'Toronto',
        'Calgary',
        'Vancouver'
      ));
    });

  });



});
