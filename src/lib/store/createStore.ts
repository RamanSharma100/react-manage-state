import type { Middleware, MiddlewareAPI, Reducer } from '../types';
import { applyMiddleware } from '../middlewares/applymiddlewares';
import { thunk } from '../middlewares/thunk';
import { enableDevtools } from '../devtools/devtools';

export const createStore = <S>(options: {
  reducers: Reducer<S>;
  middlewares?: Middleware[];
  initialState?: S;
  devTools?: boolean;
}) => {
  let state: S = options.initialState as S;
  const listeners: Array<Function> = [];

  state = options.reducers(state, { type: '@@redux/INIT' });

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
    state = options.reducers(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  dispatch = applyMiddleware(
    [thunk, ...(options.middlewares ?? [])],
    store,
    baseDispatch
  );

  if (options.devTools) {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      enableDevtools(store.getState, dispatch);
    }
  }

  return {
    getState: () => state,
    dispatch,
    subscribe: (listener: Function) => {
      listeners.push(listener);
      return () => listeners.filter((l) => l !== listener);
    },
    replaceReducer: (newReducer: Reducer<S>) => {
      options.reducers = newReducer;
      state = newReducer(state, { type: '@@redux/INIT' });
    },
  };
};
