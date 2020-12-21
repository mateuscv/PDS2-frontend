import { createStore } from "redux";
import AllReducer from "./store/reducers";
import ls from "local-storage";

const creds = {
  token: ls.get("token"),
};

export let initialState = creds;

const siderBar = {
  sidebarShow: "responsive",
};

const changeState = (state = siderBar, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(AllReducer, initialState);

store.subscribe(() => {
  const { token } = store.getState();

  ls.set("token", token);
});

export default store;
