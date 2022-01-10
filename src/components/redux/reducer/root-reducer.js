import { combineReducers } from "redux";
import meetingsReducer from "./reducer";

const rootReducer = combineReducers({
  data: meetingsReducer,
});

export default rootReducer;
