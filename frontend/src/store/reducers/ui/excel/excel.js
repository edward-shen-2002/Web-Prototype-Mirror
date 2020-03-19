import { createReducer } from "@store/tools/setup"; 

import {
  createEmptyEditor,
  createEmptyEditorValue
} from "@tools/slate";

// import EXCEL_START_SELECTION from "/START_SELECTION";
// import EXCEL_MOVE_SELECTION from "/MOVE_SELECTION";
// import EXCEL_END_SELECTION from "./mouse/END_SELECTION";

import EXCEL_DELETE_CELLS_SHIFT_UP from "./commands/DELETE_CELLS_SHIFT_UP";
import EXCEL_DELETE_CELLS_SHIFT_LEFT from "./commands/DELETE_CELLS_SHIFT_LEFT";
import EXCEL_ADD_SHEET from "./commands/ADD_SHEET";
import EXCEL_SET_SHEET from "./commands/SET_SHEET";

// import EXCEL_ADD_COMMENT from "./commands/ADD_COMMENT";
// import EXCEL_DELETE_COMMENT from "./commands/DELETE_COMMENT";
import EXCEL_SET_PREPOPULATE from "./commands/SET_PREPOPULATE";
import EXCEL_INSERT_ROW from "./commands/INSERT_ROW";
import EXCEL_INSERT_COLUMN from "./commands/INSERT_COLUMN";

import EXCEL_SET_EXCEL_DATA from "./commands/SET_EXCEL_DATA";
import EXCEL_RESET_EXCEL_DATA from "./commands/RESET_EXCEL_DATA";

import EXCEL_SET_NAME from "./commands/SET_NAME";

// import EXCEL_RIGHT_CLICK from "/RIGHT_CLICK";
// import EXCEL_DOUBLE_CLICK_EDITABLE_CELL from "/DOUBLE_CLICK_EDITABLE_CELL";
// import EXCEL_MOUSE_UP from "/MOUSE_UP";
// import EXCEL_MOUSE_MOVE from "/MOUSE_MOVE";
// import EXCEL_MOUSE_DOWN from "/MOUSE_DOWN"
// import EXCEL_ARROW_DOWN from "/ARROW_DOWN";
// import EXCEL_ARROW_UP from "/ARROW_UP";
// import EXCEL_ARROW_LEFT from "/ARROW_LEFT";
// import EXCEL_ARROW_RIGHT from "/ARROW_RIGHT";
// import EXCEL_TAB from "/TAB";
// import EXCEL_ENTER from "/ENTER";
// import EXCEL_DELETE from "/DELETE";

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
  activeCellInputAutoFocus: true,
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

    EXCEL_SET_NAME
  }
);

export default excelReducer;
