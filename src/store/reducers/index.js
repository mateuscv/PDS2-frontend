import { combineReducers } from "redux";
import setToken from "./setToken";

const allReducers = combineReducers({
  token: setToken,
});

export default allReducers;
