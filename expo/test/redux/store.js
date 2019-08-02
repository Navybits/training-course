import { createStore, combineReducers } from "redux";
import counter from "./reducers/counter";
import userData from "./reducers/userData";
// A very simple store
export default createStore(combineReducers({ counter: counter, userData }));
