import { undox } from 'undox';

import { createReducer } from '../../../tools/setup';

import { createEmptyEditor, createEmptyEditorValue } from '../../../../tools/slate';

// import EXCEL_START_SELECTION from "/START_SELECTION";
// import EXCEL_MOVE_SELECTION from "/MOVE_SELECTION";
// import EXCEL_END_SELECTION from "./mouse/END_SELECTION";

import EXCEL_SELECT_ALL from './commands/SELECT_ALL';

import EXCEL_SELECT_OVER from './mouse/SELECT_OVER';

import EXCEL_DELETE_CELLS_SHIFT_UP from './commands/DELETE_CELLS_SHIFT_UP';
import EXCEL_DELETE_CELLS_SHIFT_LEFT from './commands/DELETE_CELLS_SHIFT_LEFT';
import EXCEL_ADD_SHEET from './commands/ADD_SHEET';
import EXCEL_SET_SHEET from './commands/SET_SHEET';

import EXCEL_ADD_COMMENT from './commands/ADD_COMMENT';
import EXCEL_DELETE_COMMENT from './commands/DELETE_COMMENT';
import EXCEL_SET_PREPOPULATE from './commands/SET_PREPOPULATE';

import EXCEL_INSERT_ROW from './commands/INSERT_ROW';
import EXCEL_INSERT_COLUMN from './commands/INSERT_COLUMN';

import EXCEL_SET_EXCEL_DATA from './commands/SET_EXCEL_DATA';
import EXCEL_RESET_EXCEL_DATA from './commands/RESET_EXCEL_DATA';

import EXCEL_SET_NAME from './commands/SET_NAME';

import EXCEL_TOGGLE_TEMPLATE_PUBLISH from './commands/TOGGLE_TEMPLATE_PUBLISH';

import EXCEL_RIGHT_CLICK_CELL from './mouse/RIGHT_CLICK_CELL';
import EXCEL_DOUBLE_CLICK_EDITABLE_CELL from './mouse/DOUBLE_CLICK_EDITABLE_CELL';
import EXCEL_MOUSE_DOWN from './mouse/MOUSE_DOWN';

import EXCEL_ARROW_DOWN from './keyboard/ARROW_DOWN';
import EXCEL_ARROW_UP from './keyboard/ARROW_UP';
import EXCEL_ARROW_LEFT from './keyboard/ARROW_LEFT';
import EXCEL_ARROW_RIGHT from './keyboard/ARROW_RIGHT';

import EXCEL_SET_SCROLL_DATA from './events/SET_SCROLL_DATA';

import EXCEL_SET_ACTIVE_CELL_DIALOG from './commands/SET_ACTIVE_CELL_DIALOG';
import EXCEL_RESET_ACTIVE_CELL_DIALOG from './commands/RESET_ACTIVE_CELL_DIALOG';

import EXCEL_SET_ACTIVE_CELL_INPUT_VALUE from './commands/SET_ACTIVE_CELL_INPUT_VALUE';

import EXCEL_DISABLE_EDIT_MODE from './events/DISABLE_EDIT_MODE';

import EXCEL_TAB from './keyboard/TAB';
import EXCEL_ENTER from './keyboard/ENTER';
import EXCEL_DELETE from './keyboard/DELETE';

import EXCEL_DOWNLOAD from './commands/DOWNLOAD';
import EXCEL_SAVE from './commands/SAVE';

import EXCEL_SET_BUSINESS_CONCEPT from './commands/SET_BUSINESS_CONCEPT';

import EXCEL_MERGE_CELLS from './commands/MERGE_CELLS';
import EXCEL_UNMERGE_CELLS from './commands/UNMERGE_CELLS';

import EXCEL_SET_GROUPS from './commands/SET_GROUPS';

import EXCEL_SELECT_ROW from './mouse/SELECT_ROW';
import EXCEL_RESIZE_ROW_START from './mouse/RESIZE_ROW_START';

import EXCEL_SELECT_COLUMN from './mouse/SELECT_COLUMN';
import EXCEL_RESIZE_COLUMN_START from './mouse/RESIZE_COLUMN_START';

import EXCEL_RESIZE_ROW from './mouse/RESIZE_ROW';
import EXCEL_RESIZE_COLUMN from './mouse/RESIZE_COLUMN';

import EXCEL_SELECT_END from './mouse/SELECT_END';
import EXCEL_RESIZE_ROW_END from './mouse/RESIZE_ROW_END';
import EXCEL_RESIZE_COLUMN_END from './mouse/RESIZE_COLUMN_END';

import EXCEL_ENABLE_SHEET_FOCUS from './events/ENABLE_SHEET_FOCUS';
import EXCEL_DISABLE_SHEET_FOCUS from './events/DISABLE_SHEET_FOCUS';

const ignoredActionsMap = {
  // EXCEL_MOUSE_DOWN: true,
  EXCEL_SELECT_OVER: true,
  // EXCEL_SET_SCROLL_DATA: true,
  // EXCEL_SET_ACTIVE_CELL_INPUT_VALUE: true
};

const defaultState = {
  name: '',
  type: '',
  activeCellInputData: {
    cellEditor: createEmptyEditor(),
    formulaEditor: createEmptyEditor(),
    cellValue: createEmptyEditorValue(),
    formulaValue: createEmptyEditorValue(),
  },
  activeCellDialog: null,
  activeSheetName: 'Sheet1',
  activeSelectionArea: null,
  activeCellPosition: { x: 1, y: 1 },
  activeCellSelectionAreaIndex: -1,
  isSheetFocused: true,
  rowResizeData: null,
  columnResizeData: null,
  freezeRowResizeData: null,
  freezeColumnResizeData: null,
  stagnantSelectionAreas: [],
  selectedRows: {},
  selectedColumns: {},
  sheetNames: [],
  scrollData: {
    horizontalScrollDirection: 'forward',
    scrollLeft: 0,
    scrollTop: 0,
    scrollUpdateWasRequested: false,
    verticalScrollDirection: 'forward',
  },
  cursorType: 'default',

  isSelectionMode: false,
  isEditMode: false,
  isColumnResizeMode: false,
  isFreezeColumnResizeMode: false,
  isRowResizeMode: false,
  isFreezeRowResizeMode: false,
  sheetCellData: {},
  sheetColumnCount: {},
  sheetColumnWidths: {},
  sheetFreezeColumnCount: 0,
  sheetRowCount: {},
  sheetRowHeights: {},
  sheetFreezeRowCount: 0,
  sheetHiddenColumns: {},
  sheetHiddenRows: {},

  inactiveSheets: {},

  contextMenuData: { isOpen: false, anchorPosition: null },
  isTemplatePublished: false,
  templateId: '',
  bundleId: '',
};

const reducerMap = {
  EXCEL_ARROW_DOWN,
  EXCEL_ARROW_LEFT,
  EXCEL_ARROW_RIGHT,
  EXCEL_ARROW_UP,
  EXCEL_DELETE,
  EXCEL_ENTER,
  EXCEL_DELETE_CELLS_SHIFT_LEFT,
  EXCEL_DELETE_CELLS_SHIFT_UP,
  EXCEL_DOUBLE_CLICK_EDITABLE_CELL,
  EXCEL_RESIZE_COLUMN_START,
  EXCEL_RESIZE_ROW_START,
  EXCEL_DISABLE_EDIT_MODE,
  EXCEL_INSERT_COLUMN,
  EXCEL_INSERT_ROW,
  EXCEL_MOUSE_DOWN,
  EXCEL_SELECT_OVER,
  EXCEL_RIGHT_CLICK_CELL,
  EXCEL_SELECT_ALL,
  EXCEL_SELECT_COLUMN,
  EXCEL_SELECT_ROW,
  // EXCEL_SET_BLOCK_STYLE,
  EXCEL_SET_BUSINESS_CONCEPT,
  EXCEL_SET_GROUPS,
  EXCEL_SET_PREPOPULATE,
  EXCEL_SET_SCROLL_DATA,
  // EXCEL_ESCAPE,
  // EXCEL_SET_SHEET_NAME,
  EXCEL_SET_SHEET,
  EXCEL_TAB,
  EXCEL_SET_EXCEL_DATA,
  EXCEL_RESET_EXCEL_DATA,
  EXCEL_SET_NAME,
  EXCEL_TOGGLE_TEMPLATE_PUBLISH,
  EXCEL_SET_ACTIVE_CELL_DIALOG,
  EXCEL_RESET_ACTIVE_CELL_DIALOG,
  EXCEL_SET_ACTIVE_CELL_INPUT_VALUE,
  // EXCEL_SET_READ_ONLY,
  // EXCEL_UNSET_READ_ONLY,
  EXCEL_DOWNLOAD,
  EXCEL_SAVE,
  EXCEL_ADD_COMMENT,
  EXCEL_DELETE_COMMENT,

  EXCEL_MERGE_CELLS,
  EXCEL_UNMERGE_CELLS,

  EXCEL_RESIZE_ROW,
  EXCEL_RESIZE_COLUMN,

  EXCEL_SELECT_END,

  EXCEL_RESIZE_ROW_END,
  EXCEL_RESIZE_COLUMN_END,

  EXCEL_ENABLE_SHEET_FOCUS,
  EXCEL_DISABLE_SHEET_FOCUS,
};

const excelReducer = createReducer(defaultState, reducerMap);

export default undox(excelReducer, undefined, undefined, ignoredActionsMap);
