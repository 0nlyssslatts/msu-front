import { combineReducers } from "redux";

import authReducer from "./authReducer";
import scheduleReducer from "./scheduleReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    schedule: scheduleReducer,
});

export default rootReducer;
