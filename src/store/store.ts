import { createStore, combineReducers } from '../lib';
import { counterReducer } from './slices/counterSlice';
import { counter2Reducer } from './slices/counter2Slice';

const store = createStore({
  reducers: combineReducers({
    counter: counterReducer,
    counter2: counter2Reducer,
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
