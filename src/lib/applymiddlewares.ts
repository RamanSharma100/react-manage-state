import { Middleware, MiddlewareAPI } from './types';

export const applyMiddleware = <S>(
  middlewares: Middleware[],
  storeAPI: MiddlewareAPI<S>,
  baseDispatch: (action: any) => any
): ((action: any) => any) => {
  const chain = middlewares.map((mw) => mw(storeAPI));
  return compose(...chain)(baseDispatch);
};

export const compose = (...funcs: Function[]) => {
  if (funcs.length === 0) return (arg: any) => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
};
