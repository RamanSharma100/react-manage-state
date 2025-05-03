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
    increment2: async (state: CounterState) => (dispatch: any) => {
      setTimeout(() => {
        state.value += 1;
      }, 5000);
    },
  },
});

export const counterReducer = counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
