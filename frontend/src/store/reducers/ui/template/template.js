import { combineReducers } from "redux";

import name from "./name";
import published from "./published";

const templateReducer = combineReducers({
  name,
  published
});

export default templateReducer;