import { createStore, combineReducers } from "redux";
import counter from "./reducers/counter";

// A very simple store
export default createStore(combineReducers({ counter: counter }));
