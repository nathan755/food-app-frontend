import { combineReducers } from 'redux';
import account from "./account";
import popup from "./popup";

const rootReducer =  combineReducers({
    account,
    popup
});

export default rootReducer;

