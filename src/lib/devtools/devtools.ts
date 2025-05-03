export const enableDevtools = <S>(
  getState: () => S,
  dispatch: (action: any) => any
) => {
  if (
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ) {
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
    extension.init(getState());

    const originalDispatch = dispatch;
    dispatch = (action) => {
      const result = originalDispatch(action);
      extension.send(action, getState());
      return result;
    };

    extension.subscribe((message: any) => {
      if (message.type === 'DISPATCH' && message.payload.type === 'ACTION') {
        dispatch(message.payload);
      }
    });

    return dispatch;
  }

  return dispatch;
};
