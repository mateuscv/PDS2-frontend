import { createStore } from "redux";
import AllReducer from "./reducers";
import ls from "local-storage";

const initialState = {
  sidebarShow: "responsive",
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

// var creds = {
//   user: {
//     id: ls.get("id"),
//     token: ls.get("token"),
//   },
// };

const store = createStore(changeState);

export default store;
