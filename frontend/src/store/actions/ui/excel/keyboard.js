import {
  EXCEL_ARROW_UP,
  EXCEL_ARROW_DOWN,
  EXCEL_ARROW_LEFT,
  EXCEL_ARROW_RIGHT,
  EXCEL_ENTER,
  EXCEL_TAB,
  EXCEL_ESCAPE
} from "@actionCreators";

export const arrowDown = (props) => ({ type: EXCEL_ARROW_DOWN, ...props });

export const arrowUp = (props) => ({ type: EXCEL_ARROW_UP, ...props });

export const arrowLeft = (props) => ({ type: EXCEL_ARROW_LEFT, ...props });

export const arrowRight = (props) => ({ type: EXCEL_ARROW_RIGHT, ...props });

export const tab = (props) => ({ type: EXCEL_TAB, ...props });

export const enter = (props) => ({ type: EXCEL_ENTER, ...props });

export const escape = (props) => ({ type: EXCEL_ESCAPE, ...props });
