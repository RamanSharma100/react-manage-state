import useStore from './useStore';

const useDispatch = <Dispatch = (action: any) => any>() => {
  const store = useStore();
  return store.dispatch as Dispatch;
};

export default useDispatch;
