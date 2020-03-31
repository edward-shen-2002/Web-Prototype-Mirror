import {
  EXCEL_SET_SCROLL_DATA,
  EXCEL_ENABLE_EDIT_MODE,
  EXCEL_DISABLE_EDIT_MODE
} from "@actionCreators";

export const setScrollData = (scrollData) => ({ type: EXCEL_SET_SCROLL_DATA, scrollData });

export const enableEditMode = () => ({ type: EXCEL_ENABLE_EDIT_MODE });

export const disableEditMode = () => ({ type: EXCEL_DISABLE_EDIT_MODE });

export const enableAutoFocus = () => ({ type: EXCEL_ENABLE_SHEET_FOCUS });
