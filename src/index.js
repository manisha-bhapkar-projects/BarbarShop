import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
const jsx = (
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
