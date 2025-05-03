import { createContext, type ReactNode } from 'react';

import type { Store } from '../types';

type StoreContextType<S> = {
  store: Store<S>;
  children: ReactNode;
};

const StoreContext = createContext<Store<any>>({
  getState: () => ({}),
  dispatch: () => {},
  subscribe: () => () => {},
  replaceReducer: () => {},
});

const StoreProvider = <S,>({ store, children }: StoreContextType<S>) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
