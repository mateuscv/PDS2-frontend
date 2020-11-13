import { createStore } from "redux";
import AllReducer from "./reducers";
import ls from "local-storage";

// var creds = {
//   user: {
//     id: ls.get("id"),
//     token: ls.get("token"),
//   },
// };

const store = createStore();

export default store;
