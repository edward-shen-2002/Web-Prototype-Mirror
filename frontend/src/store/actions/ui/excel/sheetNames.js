import { UPDATE_SHEET_NAMES, RESET_SHEET_NAMES } from "@actionCreators";

export const updateSheetNames = (sheetNames) => ({ type: UPDATE_SHEET_NAMES, sheetNames });

export const resetSheetNames = () => ({ type: RESET_SHEET_NAMES });