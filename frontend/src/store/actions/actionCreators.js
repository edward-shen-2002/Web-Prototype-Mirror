/**
 * App state: data that is specific to the application's behavior
 */

// Activity
export const SET_OFFLINE = "SET_OFFLINE";
export const SET_ONLINE = "SET_ONLINE";

// Reconnection
export const SET_SHOULD_RECONNECT = "SET_SHOULD_RECONNECT";

/**
 * Domain data: data that the application needs to show, use, or modify
 */

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const CLEAR_ACCOUNT = "CLEAR_ACCOUNT";

/**
 * UI data: data related to the views/components display state
 */
export const SHOW_APP_NAVIGATION = "SHOW_APP_NAVIGATION";
export const HIDE_APP_NAVIGATION = "HIDE_APP_NAVIGATION";

export const UPDATE_SELECTION_AREA = "UPDATE_SELECTION_AREA";
export const RESET_SELECTION_AREA = "RESET_SELECTION_AREA";

export const SET_SELECTION_MDOE_ON = "SET_SELECTION_MODE_ON";
export const SET_SELECTION_MODE_OFF = "SET_SELECTION_MODE_OFF";

export const SET_EDIT_MODE_ON = "SET_EDIT_MODE_ON";
export const SET_EDIT_MODE_OFF = "SET_EDIT_MODE_OFF";