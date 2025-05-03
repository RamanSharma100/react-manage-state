import { Draft } from 'immer';
import type { Action, Reducer } from '../types';

export const combineReducers = <S, A extends { type: string }>(
  reducers: Record<string, Reducer<S, Action<A>>>
): Reducer<S> => {
  return (state: Draft<S> | undefined, action: Action<A>): S => {
    const nextState: any = {};
    let hasChanged = false;

    for (const key in reducers) {
      const reducer = reducers[key];
      const previousStateForKey = state ? (state as any)[key] : undefined;
      const nextStateForKey = reducer(previousStateForKey, action as any);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : (state as S);
  };
};
