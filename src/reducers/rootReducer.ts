import { combineReducers } from "redux";

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import scheduleReducer from "./scheduleReducer";
import taskReduser from './taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: usersReducer,
  schedule: scheduleReducer,
  task: taskReduser,
});

export default rootReducer;
