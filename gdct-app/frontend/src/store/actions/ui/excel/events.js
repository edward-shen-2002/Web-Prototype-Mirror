import {
  EXCEL_SET_SCROLL_DATA,
  EXCEL_ENABLE_EDIT_MODE,
  EXCEL_DISABLE_EDIT_MODE,
  EXCEL_ENABLE_SHEET_FOCUS,
  EXCEL_DISABLE_SHEET_FOCUS,
} from '../../actionTypes';

export const setScrollData = scrollData => ({
  type: EXCEL_SET_SCROLL_DATA,
  scrollData,
});

export const enableEditMode = () => ({ type: EXCEL_ENABLE_EDIT_MODE });

export const disableEditMode = () => ({ type: EXCEL_DISABLE_EDIT_MODE });

export const enableSheetFocus = () => ({ type: EXCEL_ENABLE_SHEET_FOCUS });
export const disableSheetFocus = () => ({ type: EXCEL_DISABLE_SHEET_FOCUS });
