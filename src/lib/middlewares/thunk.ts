import type { Middleware, ThunkAction } from '../types';

export const thunk: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) =>
    typeof action === 'function'
      ? (action as ThunkAction)(dispatch, getState)
      : next(action);
