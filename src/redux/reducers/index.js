import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import notification from "./notification";
import app from "./app";
const rootReducer =  combineReducers({
    account,
    popup,
    notification,
    app,
});

export default rootReducer;

