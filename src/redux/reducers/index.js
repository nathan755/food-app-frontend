import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";
import notification from "./notification";

const rootReducer =  combineReducers({
    account,
    popup,
    notification
});

export default rootReducer;

