const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;

    case "LOGOUT":
      return false;

    case "RESET":
      return false;

    default:
      return state;
  }
};

export default isLoggedReducer;
