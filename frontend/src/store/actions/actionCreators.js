/**
 * UI state: data that represents how the UI is currently displayed
 */

// // Navigation
// export const OPEN_MAIN_NAV = "OPEN_MAIN_NAV";
// export const CLOSE_MAIN_NAV = "CLOSE_MAIN_NAV";
// export const TOGGLE_MAIN_NAV = "TOGGLE_MAIN_NAV";

/**
 * App state: data that is specific to the application's behavior
 */

// Activity
export const SET_OFFLINE = "SET_OFFLINE";
export const SET_ONLINE = "SET_ONLINE";

// Reconnection
export const SET_SHOULDRECONNECT = "SET_SHOULDRECONNECT";

/**
 * Domain data: data that the application needs to show, use, or modify
 */

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const CLEAR_ACCOUNT = "CLEAR_ACCOUNT";

/**
 * UI data: data related to the views/components display state
 */
export const SHOW_APPNAVIGATION = "SHOW_APPNAVIGATION";
export const HIDE_APPNAVIGATION = "HIDE_APPNAVIGATION";

export const UPDATE_ACTIVECELL = "UPDATE_ACTIVECELL";
export const RESET_ACTIVECELL = "RESET_ACTIVECELL";

export const UPDATE_SELECTIONAREA = "UPDATE_SELECTIONAREA";
export const RESET_SELECTIONAREA = "RESET_SELECTIONAREA";