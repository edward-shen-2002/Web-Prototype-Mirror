import { createReducer } from "@store/tools/setup";

const UPDATE_CONTEXT_MENU_DATA = (state, { contextMenuData }) => ({ ...state, ...contextMenuData });

const RESET_CONTEXT_MENU_DATA = () => ({ isOpen: false, anchorPosition: null });

const contextMenuData = createReducer({ isOpen: false, anchorPosition: null }, { UPDATE_CONTEXT_MENU_DATA, RESET_CONTEXT_MENU_DATA });

export default contextMenuData;