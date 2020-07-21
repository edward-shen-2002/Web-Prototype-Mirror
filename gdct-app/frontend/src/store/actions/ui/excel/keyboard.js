import {
  EXCEL_ARROW_UP,
  EXCEL_ARROW_DOWN,
  EXCEL_ARROW_LEFT,
  EXCEL_ARROW_RIGHT,
  EXCEL_ENTER,
  EXCEL_TAB,
  EXCEL_ESCAPE,
  EXCEL_DELETE,
} from '../../actionTypes';

export const keyArrowDown = props => ({ type: EXCEL_ARROW_DOWN, ...props });
export const keyArrowUp = props => ({ type: EXCEL_ARROW_UP, ...props });
export const keyArrowLeft = props => ({ type: EXCEL_ARROW_LEFT, ...props });
export const keyArrowRight = props => ({ type: EXCEL_ARROW_RIGHT, ...props });

export const keyTab = props => ({ type: EXCEL_TAB, ...props });
export const keyEnter = props => ({ type: EXCEL_ENTER, ...props });
export const keyEscape = props => ({ type: EXCEL_ESCAPE, ...props });
export const keyDelete = () => ({ type: EXCEL_DELETE });
