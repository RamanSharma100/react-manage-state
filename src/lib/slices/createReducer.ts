import type { Action, Reducer } from '../types';

export const createReducer = <S>(
  initialState: S,
  cases: Record<string, (state: S, action: Action<S>) => S>
): Reducer<S> => {
  return (state = initialState, action) => {
    const caseReducer = cases[action.type];
    if (caseReducer) {
      return caseReducer(state, action);
    }
    return state;
  };
};
