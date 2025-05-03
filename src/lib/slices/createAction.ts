export const createAction = <T extends string>(type: T) => {
  return (payload: any) => ({
    type,
    payload,
  });
};
