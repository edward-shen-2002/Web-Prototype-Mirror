import {
  UPDATE_WORKBOOK_NAME,
  RESET_WORKBOOK_NAME
} from "@actionCreators";

export const updateWorkbookName = (name) => ({ type: UPDATE_WORKBOOK_NAME, name });

export const resetWorkbookName = () => ({ type: RESET_WORKBOOK_NAME });