// https://docs.pmnd.rs/zustand/guides/testing#resetting-state-between-tests-in-react-dom
const actualCreate = jest.requireActual('zustand'); // if using jest
import {act} from '@testing-library/react-native';

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = createState => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
beforeEach(() => {
  act(() => storeResetFns.forEach(resetFn => resetFn()));
});
