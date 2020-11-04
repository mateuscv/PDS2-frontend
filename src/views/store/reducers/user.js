const user = (state = 0, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ID":
      return {
        ...state,
        id: 1,
      };
  }
  return state;
};

export default user;
