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
  const listeners: Array<() => void> = [];

  state = options.reducers(state, { type: '@@redux/INIT' });

  const getState = () => state;

  let dispatch: (action: any) => any = () => {
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

  if (options.devTools && window.__REDUX_DEVTOOLS_EXTENSION__) {
    dispatch = enableDevtools(getState, dispatch);
  }

  return {
    getState,
    dispatch,
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    replaceReducer: (newReducer: Reducer<S>) => {
      options.reducers = newReducer;
      state = newReducer(state, { type: '@@redux/INIT' });
    },
  };
};
