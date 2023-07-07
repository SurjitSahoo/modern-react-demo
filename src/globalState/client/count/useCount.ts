/**
 * Just like rtk-query api hooks, Create custom hooks for client states as well
 * to abstract away all the internal state handling and return a useState like hook
 * that provides the state variable and a collection of modifier functions to update the state
 */

import { useActionDispatch, useStateSelector } from 'globalState/core';
import { countActions } from './count';

export const useCount = () => {
  const { count } = useStateSelector(state => state.count);
  const dispatch = useActionDispatch();
  return {
    count,
    incrementBy: (value: number) => dispatch(countActions.incrementBy(value)),
    decrementBy: (value: number) => dispatch(countActions.decrementBy(value)),
  };
};
