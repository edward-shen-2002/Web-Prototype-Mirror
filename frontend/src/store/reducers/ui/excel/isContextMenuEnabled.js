import { createReducer } from "store/tools/setup";

const SET_CONTEXT_MENU_ENALBED = () => true;

const DISABLE_CONTEXT_MENU = () => false;

const isContextMenuEnabledReducer = createReducer(false, { SET_CONTEXT_MENU_ENALBED, DISABLE_CONTEXT_MENU });

export default isContextMenuEnabledReducer;