import {expect} from 'chai';
import {List, Map} from 'immutable';

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

      // The new list has modifications applied.
      expect(nextState).to.equal(List.of(
        'Toronto',
        'Calgary',
        'Vancouver'
      ));

      // The original list is immutable.
      expect(state).to.equal(List.of(
        'Toronto',
        'Calgary'
      ));
    });
  });

  describe('a tree', () => {
    function addCity(currentState, city) {
      return currentState.update('cities', cities => cities.push(city));
    }

    it('is immutable', () => {
      let state = Map({
        cities: List.of('Toronto', 'Calgary', 'Vancouver')
      });
      let nextState = addCity(state, 'Seattle');

      expect(nextState).to.equal(Map({
        cities: List.of(
          'Toronto',
          'Calgary',
          'Vancouver',
          'Seattle'
        )
      }));

      // Original state tree is unmodified.
      expect(state).to.equal(Map({
        cities: List.of(
          'Toronto',
          'Calgary',
          'Vancouver'
        )
      }))
    });
  });



});
