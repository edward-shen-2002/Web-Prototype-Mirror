import { UPDATE_CONTEXT_MENU_DATA, RESET_CONTEXT_MENU_DATA } from "@actionCreators";  

export const updateContextMenuData = (contextMenuData) => ({ type: UPDATE_CONTEXT_MENU_DATA, contextMenuData });
export const resetContextMenuData = () => ({ type: RESET_CONTEXT_MENU_DATA });
