# React Manage State

React Manage State is a lightweight and customizable state management library inspired by Redux Toolkit. It offers a simple yet powerful API for managing application state in React projects. Designed to be modular, extensible, and developer-friendly, this library is ideal for those seeking fine-grained control over their state management.

## Features

- **Custom Store**: Easily create and manage your store with `createStore`.
- **State Slices**: Modularize your state using `createSlice`.
- **Middleware Support**: Extend functionality with custom middleware.
- **Thunk Middleware**: Built-in support for asynchronous actions (Work in Progress).
- **DevTools Integration**: Debug state changes with Redux DevTools.
- **React Hooks**: Seamlessly integrate with React using `useSelector`, `useDispatch`, and `useStore`.
- **Immer Integration**: Simplify immutable state updates with Immer.
- **TypeScript Support**: Fully typed for an enhanced developer experience.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/react-manage-state.git
cd react-manage-state
bun install
```

## Usage

### Setting up the Store (`store.ts`)

```typescript
import { createStore } from './lib';
import { counterReducer } from './store/slices/counterSlice';

const store = createStore({
  reducers: counterReducer,
  devTools: true,
});

export default store;
```

### Providing the Store

Wrap your application with the `StoreProvider` in `Main.tsx`:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from './lib';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>
);
```

### Using State and Dispatch

Access state with `useSelector` and dispatch actions with `useDispatch` in `App.tsx`:

```typescript
import { useSelector, useDispatch } from './lib';
import { increment } from './store/slices/counterSlice';

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {state.value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};

export default App;
```

## API Reference

### `createStore`

Creates a store with reducers, middleware, and optional DevTools integration.

### `createSlice`

Defines a slice of state with reducers and actions.

### `useSelector`

Selects a piece of state from the store.

### `useDispatch`

Returns the dispatch function to trigger actions.

### `useStore`

Provides direct access to the store.

### `applyMiddleware`

Applies middleware to the store.

### `thunk` (Work in Progress)

Middleware for handling asynchronous actions.

### `enableDevtools`

Integrates the store with the Redux DevTools Extension.

## Contributing

We welcome contributions! Please review the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

### Contribution Guidelines

- Follow the existing code style and structure.
- Write clear and concise commit messages.
- Add tests for new features or bug fixes.
- Update documentation for any changes affecting usage.

## Reporting Issues

If you encounter any issues or have suggestions for improvements, please open an issue in the [GitHub Issues](https://github.com/your-repo/react-manage-state/issues) section.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, consider leaving a ⭐ on the [GitHub repository](https://github.com/your-repo/react-manage-state). Your support is greatly appreciated!
