import { Action, createSlice } from '../../lib';

export type CounterState = {
  value: number;
};

const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice<CounterState>({
  initialState,
  name: 'counter',
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
      return state;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: Action) => {
      state.value += action.payload;
    },
  },
});

export const counterReducer = counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
