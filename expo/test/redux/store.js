import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import counter from "./reducers/counter";
import userData from "./reducers/userData";

const persistConfig = {
  key: "root",
  storage
};
let rootReducer = combineReducers({ counter: counter, userData });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};

// A very simple store
