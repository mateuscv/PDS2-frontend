export const login = (keep_alive) => {
  return {
    type: "LOGIN",
    keep_alive: keep_alive,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const setUser = (user) => {
  return {
    type: "SETUSER",
    user: user,
  };
};
export const reset = () => {
  return {
    type: "RESET",
  };
};
