import { createReducer } from "store/tools/setup";

const SET_CONTEXT_MENU_ENALBED = () => true;

const SET_CONTEXT_MENU_DISABLED = () => false;

const isContextMenuEnabledReducer = createReducer(false, { SET_CONTEXT_MENU_ENALBED, SET_CONTEXT_MENU_DISABLED });

export default isContextMenuEnabledReducer;