import { combineReducers } from 'redux';

import isOnline from './isOnline';

const app = combineReducers({
  isOnline,
  // ... other reducers
});

export default app;
