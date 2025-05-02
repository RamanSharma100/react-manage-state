export type Action<T = any> = {
  type: string;
  payload?: T;
};

export type Reducer<S = any, A extends Action = Action> = (
  state: S | undefined,
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
