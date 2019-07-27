import { createStore, combineReducers } from "redux";
import counter from "./reducers/counter";

// A very simple store
const AllReducers = combineReducers({
  counter: counter
});
export default createStore(AllReducers);
