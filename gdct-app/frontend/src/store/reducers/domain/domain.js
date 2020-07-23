import { combineReducers } from 'redux';

import account from './account';
import templates from './templates';

const appReducer = combineReducers({
  account,
  templates,
});

export default appReducer;
