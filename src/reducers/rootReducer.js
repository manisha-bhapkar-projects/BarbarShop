// you can combine multiple reducers see the commented code in this file
import { combineReducers } from "redux";

// Combine all reducers.
const appReducer = combineReducers({});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
