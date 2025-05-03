import './App.css';
import { useDispatch, useSelector } from './lib';
import { increment } from './store/slices/counterSlice';
import { RootState } from './store/store';

const App = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  return (
    <div className="App">
      {JSON.stringify(state)}
      <h1>Welcome to Custom State Managemnt Library</h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        Count
      </button>
    </div>
  );
};

export default App;
