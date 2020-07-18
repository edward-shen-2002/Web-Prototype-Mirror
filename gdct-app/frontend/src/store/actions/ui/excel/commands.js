import { UndoxTypes } from 'undox';

import {
  EXCEL_SELECT_ALL,
  EXCEL_DELETE_CELLS_SHIFT_UP,
  EXCEL_DELETE_CELLS_SHIFT_LEFT,
  EXCEL_INSERT_COLUMN,
  EXCEL_INSERT_ROW,
  EXCEL_SET_GROUPS,
  EXCEL_SET_PREPOPULATE,
  EXCEL_ENABLE_EDIT_MODE,
  EXCEL_SET_EXCEL_DATA,
  EXCEL_RESET_EXCEL_DATA,
  EXCEL_SET_NAME,
  EXCEL_TOGGLE_TEMPLATE_PUBLISH,
  EXCEL_SET_ACTIVE_CELL_DIALOG,
  EXCEL_RESET_ACTIVE_CELL_DIALOG,
  EXCEL_SET_ACTIVE_CELL_INPUT_VALUE,
  EXCEL_SET_SHEET,
  EXCEL_SET_READ_ONLY,
  EXCEL_UNSET_READ_ONLY,
  EXCEL_DOWNLOAD,
  EXCEL_SAVE,
  EXCEL_ADD_COMMENT,
  EXCEL_DELETE_COMMENT,
  EXCEL_MERGE_CELLS,
  EXCEL_UNMERGE_CELLS,
} from '../../actionTypes';

export const selectAll = props => ({ type: EXCEL_SELECT_ALL, ...props });

export const deleteCellsShiftUp = props => ({
  type: EXCEL_DELETE_CELLS_SHIFT_UP,
  ...props,
});
export const deleteCellsShiftLeft = props => ({
  type: EXCEL_DELETE_CELLS_SHIFT_LEFT,
  ...props,
});

export const insertColumn = () => ({ type: EXCEL_INSERT_COLUMN });
export const insertRow = () => ({ type: EXCEL_INSERT_ROW });

export const setGroups = props => ({ type: EXCEL_SET_GROUPS, ...props });
export const setPrepopulate = props => ({
  type: EXCEL_SET_PREPOPULATE,
  ...props,
});

export const enableEditMode = () => ({ type: EXCEL_ENABLE_EDIT_MODE });

export const setExcelData = excelData => ({
  type: EXCEL_SET_EXCEL_DATA,
  excelData,
});
export const resetExcelData = () => ({ type: EXCEL_RESET_EXCEL_DATA });

export const setName = name => ({ type: EXCEL_SET_NAME, name });

export const toggleTemplatePublish = () => ({
  type: EXCEL_TOGGLE_TEMPLATE_PUBLISH,
});

export const setActiveCellDialog = props => ({
  type: EXCEL_SET_ACTIVE_CELL_DIALOG,
  ...props,
});
export const resetActiveCellDialog = () => ({
  type: EXCEL_RESET_ACTIVE_CELL_DIALOG,
});

export const setActiveCellInputValue = props => ({
  type: EXCEL_SET_ACTIVE_CELL_INPUT_VALUE,
  ...props,
});

export const setSheet = props => ({ type: EXCEL_SET_SHEET, ...props });

export const setReadOnly = () => ({ type: EXCEL_SET_READ_ONLY });
export const unsetReadOnly = () => ({ type: EXCEL_UNSET_READ_ONLY });

export const download = () => ({ type: EXCEL_DOWNLOAD });
export const save = handleSave => ({ type: EXCEL_SAVE, handleSave });

export const deleteComment = props => ({
  type: EXCEL_DELETE_COMMENT,
  ...props,
});
export const addComment = props => ({ type: EXCEL_ADD_COMMENT, ...props });

export const undo = () => ({ type: UndoxTypes.UNDO });
export const redo = () => ({ type: UndoxTypes.REDO });

export const mergeCells = () => ({ type: EXCEL_MERGE_CELLS });
export const unmergeCells = () => ({ type: EXCEL_UNMERGE_CELLS });
