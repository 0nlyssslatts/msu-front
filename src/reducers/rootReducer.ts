import { combineReducers } from "redux";

import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import scheduleReducer from "./scheduleReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: usersReducer,
    schedule: scheduleReducer,
    task: taskReducer,
});

export default rootReducer;
