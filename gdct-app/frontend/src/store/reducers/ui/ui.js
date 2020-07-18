import { combineReducers } from 'redux';

import isAppNavigationOpen from './isAppNavigationOpen';

import excel from './excel';

const uiReducer = combineReducers({
  isAppNavigationOpen,
  excel,
});

export default uiReducer;
