import { createReducer } from '../../tools/setup';

import { isTokenSaved } from '../../../tools/storage';

const defaultIsAppNavigationOpen = isTokenSaved();

const SHOW_APP_NAVIGATION = () => true;

const HIDE_APP_NAVIGATION = () => false;

const isAppNavigationOpenReducer = createReducer(defaultIsAppNavigationOpen, {
  SHOW_APP_NAVIGATION,
  HIDE_APP_NAVIGATION,
});

export default isAppNavigationOpenReducer;
