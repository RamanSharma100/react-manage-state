import type { Middleware, MiddlewareAPI, Reducer } from './types';
import { applyMiddleware } from './applymiddlewares';

export const createStore = <S>(options: {
  reducer: Reducer<S>;
  middlewares?: Middleware[];
  initialState?: S;
}) => {
  let state: S = options.initialState as S;
  const listeners: Array<Function> = [];

  const getState = () => state;

  let dispatch: (action: any) => any = (_action) => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.'
    );
  };

  const store: MiddlewareAPI<S> = {
    getState,
    dispatch: (action) => dispatch(action),
  };

  const baseDispatch = (action: any) => {
    state = options.reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  dispatch = applyMiddleware(options.middlewares ?? [], store, baseDispatch);

  return {
    getState,
    dispatch,
    subscribe: (listener: Function) => {
      listeners.push(listener);
      return () => listeners.filter((l) => l !== listener);
    },
    replaceReducer: (newReducer: Reducer<S>) => {
      options.reducer = newReducer;
      state = newReducer(state, { type: '@@redux/INIT' });
    },
  };
};
