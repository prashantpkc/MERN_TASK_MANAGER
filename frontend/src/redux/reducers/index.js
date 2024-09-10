import { combineReducers } from "redux"
import authReducer from "./authReducer"
import notificationsReducer from "./notificationReducer";

const rootReducer = combineReducers({
  authReducer,
  notificationsReducer,
});

export default rootReducer;