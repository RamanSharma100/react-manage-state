import { Action, createSlice } from '../../lib';

export type Counter2State = {
  value: number;
};

const initialState: Counter2State = { value: 0 };

export const counter2Slice = createSlice<Counter2State>({
  initialState,
  name: 'counter',
  reducers: {
    increment2: (state: Counter2State) => {
      state.value += 1;
      return state;
    },
    decrement2: (state: Counter2State) => {
      state.value -= 1;
    },
    incrementByAmount2: (state: Counter2State, action: Action) => {
      state.value += action.payload;
    },
  },
});

export const counter2Reducer = counter2Slice.reducer;

export const { increment2, decrement2, incrementByAmount2 } =
  counter2Slice.actions;
