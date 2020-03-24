import { undox } from "undox";

import { createReducer } from "@store/tools/setup"; 

import {
  createEmptyEditor,
  createEmptyEditorValue
} from "@tools/slate";

// import EXCEL_START_SELECTION from "/START_SELECTION";
// import EXCEL_MOVE_SELECTION from "/MOVE_SELECTION";
// import EXCEL_END_SELECTION from "./mouse/END_SELECTION";

import EXCEL_SELECT_ALL from "./commands/SELECT_ALL";

import EXCEL_SELECT_OVER from "./mouse/SELECT_OVER";

import EXCEL_DELETE_CELLS_SHIFT_UP from "./commands/DELETE_CELLS_SHIFT_UP";
import EXCEL_DELETE_CELLS_SHIFT_LEFT from "./commands/DELETE_CELLS_SHIFT_LEFT";
import EXCEL_ADD_SHEET from "./commands/ADD_SHEET";
import EXCEL_SET_SHEET from "./commands/SET_SHEET";

import EXCEL_ADD_COMMENT from "./commands/ADD_COMMENT";
import EXCEL_DELETE_COMMENT from "./commands/DELETE_COMMENT";
import EXCEL_SET_PREPOPULATE from "./commands/SET_PREPOPULATE";

import EXCEL_INSERT_ROW from "./commands/INSERT_ROW";
import EXCEL_INSERT_COLUMN from "./commands/INSERT_COLUMN";

import EXCEL_SET_EXCEL_DATA from "./commands/SET_EXCEL_DATA";
import EXCEL_RESET_EXCEL_DATA from "./commands/RESET_EXCEL_DATA";

import EXCEL_SET_NAME from "./commands/SET_NAME";

import EXCEL_TOGGLE_TEMPLATE_PUBLISH from "./commands/TOGGLE_TEMPLATE_PUBLISH";

import EXCEL_RIGHT_CLICK_CELL from "./mouse/RIGHT_CLICK_CELL";
import EXCEL_DOUBLE_CLICK_EDITABLE_CELL from "./mouse/DOUBLE_CLICK_EDITABLE_CELL";
import EXCEL_MOUSE_UP from "./mouse/MOUSE_UP";
import EXCEL_MOUSE_MOVE from "./mouse/MOUSE_MOVE";
import EXCEL_MOUSE_DOWN from "./mouse/MOUSE_DOWN"

import EXCEL_ARROW_DOWN from "./keyboard/ARROW_DOWN";
import EXCEL_ARROW_UP from "./keyboard/ARROW_UP";
import EXCEL_ARROW_LEFT from "./keyboard/ARROW_LEFT";
import EXCEL_ARROW_RIGHT from "./keyboard/ARROW_RIGHT";

import EXCEL_SET_SCROLL_DATA from "./events/SET_SCROLL_DATA";

import EXCEL_SET_ACTIVE_CELL_DIALOG from "./commands/SET_ACTIVE_CELL_DIALOG";
import EXCEL_RESET_ACTIVE_CELL_DIALOG from "./commands/RESET_ACTIVE_CELL_DIALOG";

import EXCEL_SET_ACTIVE_CELL_INPUT_VALUE from "./commands/SET_ACTIVE_CELL_INPUT_VALUE";

import EXCEL_DISABLE_EDIT_MODE from "./events/DISABLE_EDIT_MODE";

import EXCEL_TAB from "./keyboard/TAB";
import EXCEL_ENTER from "./keyboard/ENTER";
import EXCEL_DELETE from "./keyboard/DELETE";

import EXCEL_DOWNLOAD from "./commands/DOWNLOAD";
import EXCEL_SAVE from "./commands/SAVE";

import EXCEL_SET_BUSINESS_CONCEPT from "./commands/SET_BUSINESS_CONCEPT";

const defaultState = {
  name: "",
  type: "",
  activeCellInputData: {
    cellEditor: createEmptyEditor(),
    formulaEditor: createEmptyEditor(),
    cellValue: createEmptyEditorValue(),
    formulaValue: createEmptyEditorValue()
  },
  activeCellDialog: null,
  activeSheetName: "Sheet1",
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
    horizontalScrollDirection: "forward",
    scrollLeft: 0,
    scrollTop: 0,
    scrollUpdateWasRequested: false,
    verticalScrollDirection: "forward"
  },
  cursorType: "default",

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
  templateId: "",
  bundleId: ""
};

const excelReducer = createReducer(
  defaultState, 
  {
    EXCEL_SET_EXCEL_DATA,
    EXCEL_RESET_EXCEL_DATA,

    EXCEL_SET_NAME,

    EXCEL_TOGGLE_TEMPLATE_PUBLISH,

    EXCEL_ARROW_DOWN,
    EXCEL_ARROW_UP,
    EXCEL_ARROW_LEFT,
    EXCEL_ARROW_RIGHT,

    EXCEL_SET_SCROLL_DATA,

    EXCEL_RIGHT_CLICK_CELL,
    EXCEL_DOUBLE_CLICK_EDITABLE_CELL,
    EXCEL_MOUSE_UP,
    EXCEL_MOUSE_MOVE,
    EXCEL_MOUSE_DOWN,
    EXCEL_SELECT_OVER,

    EXCEL_ADD_SHEET,
    EXCEL_SET_SHEET,

    EXCEL_SET_ACTIVE_CELL_DIALOG,
    EXCEL_RESET_ACTIVE_CELL_DIALOG,

    EXCEL_SET_ACTIVE_CELL_INPUT_VALUE,

    EXCEL_DISABLE_EDIT_MODE,

    EXCEL_INSERT_ROW,
    EXCEL_INSERT_COLUMN,

    EXCEL_SET_PREPOPULATE,
    EXCEL_SET_BUSINESS_CONCEPT,

    EXCEL_DELETE_CELLS_SHIFT_UP,
    EXCEL_DELETE_CELLS_SHIFT_LEFT,

    EXCEL_TAB,
    EXCEL_ENTER,
    EXCEL_DELETE,
    
    EXCEL_SAVE,
    EXCEL_DOWNLOAD,

    EXCEL_ADD_COMMENT,
    EXCEL_DELETE_COMMENT,

    EXCEL_SELECT_ALL
  }
);

export default excelReducer;
