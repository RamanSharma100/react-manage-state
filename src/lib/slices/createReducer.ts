import { Draft, produce } from 'immer';
import type { Action, Reducer } from '../types';

export const createReducer = <S>(
  initialState: S,
  cases: Record<string, (state: Draft<S>, action: Action<S>) => S | void>
): Reducer<S> => {
  return (state = initialState, action: Action<S>) => {
    const caseReducer = cases[action.type];

    if (typeof caseReducer === 'function') {
      return produce(state, (draft: Draft<S>) => {
        caseReducer(draft, action);
      });
    }

    return state;
  };
};
