import { createStore } from '../lib';
import { counterReducer } from './slices/counterSlice';

const store = createStore({
  reducers: counterReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
