import { createReducer } from "store/tools/setup";

import { isTokenSaved } from "tools/storage"; 

const defaultIsAppNavigationOpen = isTokenSaved();

const showAppNavigation = () =>  true;

const hideAppNavigation = () => false;

const isAppNavigationOpenReducer = createReducer(defaultIsAppNavigationOpen, { SHOW_APPNAVIGATION: showAppNavigation, HIDE_APPNAVIGATION: hideAppNavigation });

export default isAppNavigationOpenReducer;