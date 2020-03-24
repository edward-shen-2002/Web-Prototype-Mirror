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

const ignoredActionsMap = {
  // EXCEL_MOUSE_DOWN: true,
  EXCEL_SELECT_OVER: true,
  EXCEL_SET_SCROLL_DATA: true,
  EXCEL_SET_ACTIVE_CELL_INPUT_VALUE: true
};

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

const excelReducer = (state = defaultState, action) => {
  switch(action.type) {
    case "EXCEL_SET_EXCEL_DATA":
      return EXCEL_SET_EXCEL_DATA(state, action);
    case "EXCEL_RESET_EXCEL_DATA":
      return EXCEL_RESET_EXCEL_DATA(state, action);
    case "EXCEL_SET_NAME":
      return EXCEL_SET_NAME(state, action);
    case "EXCEL_TOGGLE_TEMPLATE_PUBLISH":
      return EXCEL_TOGGLE_TEMPLATE_PUBLISH(state, action);
    case "EXCEL_ARROW_DOWN":
      return EXCEL_ARROW_DOWN(state, action);
    case "EXCEL_ARROW_UP":
      return EXCEL_ARROW_UP(state, action);
    case "EXCEL_ARROW_LEFT":
      return EXCEL_ARROW_LEFT(state, action);
    case "EXCEL_ARROW_RIGHT":
      return EXCEL_ARROW_RIGHT(state, action);
    case "EXCEL_SET_SCROLL_DATA":
      return EXCEL_SET_SCROLL_DATA(state, action);
    case "EXCEL_RIGHT_CLICK_CELL":
      return EXCEL_RIGHT_CLICK_CELL(state, action);
    case "EXCEL_DOUBLE_CLICK_EDITABLE_CELL":
      return EXCEL_DOUBLE_CLICK_EDITABLE_CELL(state, action);
    case "EXCEL_MOUSE_UP":
      return EXCEL_MOUSE_UP(state, action);
    case "EXCEL_MOUSE_MOVE":
      return EXCEL_MOUSE_MOVE(state, action);
    case "EXCEL_MOUSE_DOWN":
      return EXCEL_MOUSE_DOWN(state, action);
    case "EXCEL_SELECT_OVER":
      return EXCEL_SELECT_OVER(state, action);
    case "EXCEL_ADD_SHEET":
      return EXCEL_ADD_SHEET(state, action);
    case "EXCEL_SET_SHEET":
      return EXCEL_SET_SHEET(state, action);
    case "EXCEL_SET_ACTIVE_CELL_DIALOG":
      return EXCEL_SET_ACTIVE_CELL_DIALOG(state, action);
    case "EXCEL_RESET_ACTIVE_CELL_DIALOG":
      return EXCEL_RESET_ACTIVE_CELL_DIALOG(state, action);
    case "EXCEL_SET_ACTIVE_CELL_INPUT_VALUE":
      return EXCEL_SET_ACTIVE_CELL_INPUT_VALUE(state, action);
    case "EXCEL_DISABLE_EDIT_MODE":
      return EXCEL_DISABLE_EDIT_MODE(state, action);
    case "EXCEL_INSERT_ROW":
      return EXCEL_INSERT_ROW(state, action);
    case "EXCEL_INSERT_COLUMN":
      return EXCEL_INSERT_COLUMN(state, action);
    case "EXCEL_SET_PREPOPULATE":
      return EXCEL_SET_PREPOPULATE(state, action);
    case "EXCEL_SET_BUSINESS_CONCEPT":
      return EXCEL_SET_BUSINESS_CONCEPT(state, action);
    case "EXCEL_DELETE_CELLS_SHIFT_UP":
      return EXCEL_DELETE_CELLS_SHIFT_UP(state, action);
    case "EXCEL_DELETE_CELLS_SHIFT_LEFT":
      return EXCEL_DELETE_CELLS_SHIFT_LEFT(state, action);
    case "EXCEL_TAB":
      return EXCEL_TAB(state, action);
    case "EXCEL_ENTER":
      return EXCEL_ENTER(state, action);
    case "EXCEL_DELETE":
      return EXCEL_DELETE(state, action);
    case "EXCEL_SAVE":
      return EXCEL_SAVE(state, action);
    case "EXCEL_DOWNLOAD":
      return EXCEL_DOWNLOAD(state, action);
    case "EXCEL_ADD_COMMENT":
      return EXCEL_ADD_COMMENT(state, action);
    case "EXCEL_DELETE_COMMENT":
      return EXCEL_DELETE_COMMENT(state, action);
    case "EXCEL_SELECT_ALL":
      return EXCEL_SELECT_ALL(state, action);
    default: 
      return state;
  };
};

export default undox(excelReducer, undefined, undefined, ignoredActionsMap);
