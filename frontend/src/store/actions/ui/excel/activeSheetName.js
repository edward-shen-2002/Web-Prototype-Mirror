import { UPDATE_ACTIVE_SHEET_NAME, RESET_ACTIVE_SHEET_NAME } from "@actionCreators";

export const updateActiveSheetName = (activeSheetName) => ({ type: UPDATE_ACTIVE_SHEET_NAME, activeSheetName });

export const resetActiveSheetName = () => ({ type: RESET_ACTIVE_SHEET_NAME });