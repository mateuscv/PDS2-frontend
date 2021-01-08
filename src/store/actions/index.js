export const setToken = (token) => {
  return {
    type: "SETTOKEN",
    token: token,
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};
