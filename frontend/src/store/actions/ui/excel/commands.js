import {
  EXCEL_SELECT_ALL,
  
  EXCEL_DELETE_CELLS_SHIFT_UP,
  EXCEL_DELETE_CELLS_SHIFT_LEFT,

  EXCEL_INSERT_COLUMN,
  EXCEL_INSERT_ROW,
  
  EXCEL_SET_GROUP,
  EXCEL_SET_PREPOPULATE,
  EXCEL_ENABLE_EDIT_MODE,

  EXCEL_SET_EXCEL_DATA,
  EXCEL_RESET_EXCEL_DATA,

  EXCEL_SET_NAME,

  EXCEL_TOGGLE_TEMPLATE_PUBLISH
} from "@actionCreators";

export const selectAll = (props) => ({ type: EXCEL_SELECT_ALL, ...props });

export const deleteCellsShiftUp = (props) => ({ type: EXCEL_DELETE_CELLS_SHIFT_UP, ...props });
export const deleteCellsShiftLeft = (props) => ({ type: EXCEL_DELETE_CELLS_SHIFT_LEFT, ...props });

export const insertColumn = () => ({ type: EXCEL_INSERT_COLUMN });
export const insertRow = () => ({ type: EXCEL_INSERT_ROW });

export const setGroup = (props) => ({ type: EXCEL_SET_GROUP, ...props });
export const setPrepopulate = (props) => ({ type: EXCEL_SET_PREPOPULATE, ...props });

export const enableEditMode = () => ({ type: EXCEL_ENABLE_EDIT_MODE });

export const setExcelData = (excelData) => ({ type: EXCEL_SET_EXCEL_DATA, excelData });
export const resetExcelData = () => ({ type: EXCEL_RESET_EXCEL_DATA });

export const setName = (name) => ({ type: EXCEL_SET_NAME, name });

export const toggleTemplatePublish = () => ({ type: EXCEL_TOGGLE_TEMPLATE_PUBLISH });
