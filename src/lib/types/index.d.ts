declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__?: {
      connect: () => {
        init: (state: any) => void;
        send: (action: any, state: any) => void;
      };
      apply: (store: any) => void;
    };
  }
}

export type Action<T = any> = {
  type: string;
  payload?: T;
};

export type Reducer<S = any, A extends Action = Action> = (
  state: Draft<S> | undefined,
  action: A
) => S;

export type Listener = () => void;
export type Unsubscribe = () => void;

export type MiddlewareAPI<S = any> = {
  getState: () => S;
  dispatch: (action: Action) => void;
};

export type Middleware<S = any> = (
  api: MiddlewareAPI
) => (next: (action: Action) => void) => (action: Action) => any;

export type Dispatch<A extends Action = Action> = (action: A) => void;

export type CreateSliceProps<S> = {
  name: string;
  initialState: S;
  reducers: CaseReducers<S>;
};

export type ThunkAction<R = any, S = any> = (
  dispatch: Dispatch,
  getState: () => S
) => R;

export type Store<S = any> = {
  getState: () => S;
  dispatch: Dispatch;
  subscribe: (listener: Listener) => Unsubscribe;
  replaceReducer: (reducer: Reducer<S>) => void;
};
