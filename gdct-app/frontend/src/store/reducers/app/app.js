import { combineReducers } from 'redux';

import isOnline from './isOnline';
import shouldReconnect from './shouldReconnect';

const appReducer = combineReducers({ isOnline, shouldReconnect });

export default appReducer;
