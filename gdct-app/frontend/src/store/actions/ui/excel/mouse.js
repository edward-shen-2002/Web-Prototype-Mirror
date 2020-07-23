import {
  EXCEL_RESIZE_COLUMN_START,
  EXCEL_RESIZE_ROW_START,
  EXCEL_MOUSE_DOWN,
  EXCEL_DOUBLE_CLICK_EDITABLE_CELL,
  EXCEL_RIGHT_CLICK_CELL,
  EXCEL_SELECT_OVER,
  EXCEL_SELECT_ROW,
  EXCEL_SELECT_COLUMN,
  EXCEL_RESIZE_ROW,
  EXCEL_RESIZE_COLUMN,
  EXCEL_SELECT_END,
  EXCEL_RESIZE_ROW_END,
  EXCEL_RESIZE_COLUMN_END,
} from '../../actionTypes';

export const resizeColumnStart = props => ({
  type: EXCEL_RESIZE_COLUMN_START,
  ...props,
});
export const resizeRowStart = props => ({
  type: EXCEL_RESIZE_ROW_START,
  ...props,
});

export const mouseDown = props => ({ type: EXCEL_MOUSE_DOWN, ...props });

export const doubleClickEditableCell = props => ({
  type: EXCEL_DOUBLE_CLICK_EDITABLE_CELL,
  ...props,
});
export const rightClickCell = props => ({
  type: EXCEL_RIGHT_CLICK_CELL,
  ...props,
});

export const selectOver = props => ({ type: EXCEL_SELECT_OVER, ...props });

export const selectRow = props => ({ type: EXCEL_SELECT_ROW, ...props });
export const selectColumn = props => ({ type: EXCEL_SELECT_COLUMN, ...props });

export const resizeRow = props => ({ type: EXCEL_RESIZE_ROW, ...props });
export const resizeColumn = props => ({ type: EXCEL_RESIZE_COLUMN, ...props });

export const selectEnd = props => ({ type: EXCEL_SELECT_END, ...props });

export const resizeRowEnd = props => ({
  type: EXCEL_RESIZE_ROW_END,
  ...props,
});
export const resizeColumnEnd = props => ({
  type: EXCEL_RESIZE_COLUMN_END,
  ...props,
});
