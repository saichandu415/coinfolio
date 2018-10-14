import { combineReducers } from 'redux'
import currency from './currency';
import userStatus from './userDetails';

export default combineReducers({
    currency,
    userStatus
});
