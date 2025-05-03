import { useContext } from 'react';

import { StoreContext } from '../providers/StoreProvider';
import { Store } from '../types';

const useStore = <S>(): Store<S> => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return store as Store<S>;
};

export default useStore;
