import {
  EXCEL_RESIZE_COLUMN_START,
  EXCEL_RESIZE_ROW_START,
  EXCEL_MOUSE_UP,
  EXCEL_MOUSE_MOVE,
  EXCEL_MOUSE_DOWN,
  EXCEL_DOUBLE_CLICK_EDITABLE_CELL,
  EXCEL_RIGHT_CLICK_CELL
} from "@actionCreators";

export const resizeColumnStart = (column) => ({ type: EXCEL_RESIZE_COLUMN_START, column });
export const resizeRowStart = (row) => ({ type: EXCEL_RESIZE_ROW_START, row });

export const mouseMove = (props) => ({ type: EXCEL_MOUSE_MOVE, ...props });
export const mouseDown = (props) => ({ type: EXCEL_MOUSE_DOWN, ...props });
export const mouseUp = (props) => ({ type: EXCEL_MOUSE_UP, ...props });

export const doubleClickEditableCell = (props) => ({ type: EXCEL_DOUBLE_CLICK_EDITABLE_CELL, ...props });
export const rightClickCell = (props) => ({ type: EXCEL_RIGHT_CLICK_CELL, ...props });
