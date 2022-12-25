import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import reducers from "./reducers";
console.log(reducers);
const store = createStore(combineReducers(reducers));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
