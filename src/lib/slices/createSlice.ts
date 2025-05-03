import { Draft } from 'immer';
import type { Action, CreateSliceProps } from '../types';
import { createAction } from './createAction';
import { createReducer } from './createReducer';

export const createSlice = <S>({
  name,
  initialState,
  reducers,
}: CreateSliceProps<S>) => {
  const slice = {
    name,
    initialState,
    reducers: {
      ...reducers,
    },
  };

  const actionCreators: Record<string, (payload?: any) => Action<S>> = {};
  const cases: Record<string, (state: Draft<S>, action: Action<S>) => S> = {};

  Object.keys(slice.reducers).forEach((key) => {
    const type = `${name}/${key}`;
    actionCreators[key] = createAction(type);
    cases[type] = reducers[key];
  });

  const reducer = createReducer(slice.initialState, cases);

  return {
    name: slice.name,
    reducer,
    actions: actionCreators,
  };
};
