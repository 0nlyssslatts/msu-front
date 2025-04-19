import { combineReducers } from "redux";

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import scheduleReducer from "./scheduleReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: usersReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
