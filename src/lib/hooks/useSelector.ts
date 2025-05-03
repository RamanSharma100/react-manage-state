import { useRef, useSyncExternalStore } from 'react';

import useStore from './useStore';

const useSelector = <T, S>(
  selector: (state: T) => S,
  equalityFn: (a: S, b: S) => boolean = Object.is
): S => {
  const store = useStore<T>();
  const state = useRef<S>(selector(store.getState()));

  const getSnapshot = () => {
    const newState = selector(store.getState());
    if (!equalityFn(state.current, newState)) {
      state.current = newState;
    }
    return state.current;
  };

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
};

export default useSelector;
