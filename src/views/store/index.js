import { createStore } from "redux";

import AllReducer from "./reducers";

const store = createStore(AllReducer);

export default store;
