import { createReducer } from "@store/tools/setup";

import { isTokenSaved } from "@tools/storage"; 

const defaultIsAppNavigationOpen = isTokenSaved();

const showAppNavigation = () =>  true;

const hideAppNavigation = () => false;

const isAppNavigationOpenReducer = createReducer(defaultIsAppNavigationOpen, { SHOW_APP_NAVIGATION: showAppNavigation, HIDE_APP_NAVIGATION: hideAppNavigation });

export default isAppNavigationOpenReducer;