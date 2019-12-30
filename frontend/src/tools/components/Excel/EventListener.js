import React, { PureComponent, useMemo } from "react";

import { adminTemplateRoleAxios } from "tools/rest";

import { connect } from "react-redux";

import pako from "pako";

import { extractReactAndWorkbookState } from "tools/excel";

import { setActiveCellInputAutoFocusOn, setActiveCellInputAutoFocusOff } from "actions/ui/excel/activeCellInputAutoFocus";
import { updateActiveCellInputData, resetActiveCellInputData } from "actions/ui/excel/activeCellInputData";
import { updateActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellSelectionAreaIndex, resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { updateCursorType, resetCursorType } from "actions/ui/excel/cursorType";

import { setColumnResizeModeOn, setColumnResizeModeOff } from "actions/ui/excel/isColumnResizeMode";
import { setRowResizeModeOn, setRowResizeModeOff } from "actions/ui/excel/isRowResizeMode";
import { setFreezeRowResizeModeOn, setFreezeRowResizeModeOff } from "actions/ui/excel/isFreezeRowResizeMode";
import { setFreezeColumnResizeModeOn, setFreezeColumnResizeModeOff } from "actions/ui/excel/isFreezeColumnResizeMode";

import { updateRowResizeData, resetRowResizeData } from "actions/ui/excel/rowResizeData";
import { updateColumnResizeData, resetColumnResizeData } from "actions/ui/excel/columnResizeData";
import { updateFreezeRowResizeData, resetFreezeRowResizeData } from "actions/ui/excel/freezeRowResizeData";
import { updateFreezeColumnResizeData, resetFreezeColumnResizeData } from "actions/ui/excel/freezeColumnResizeData";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";
import { updateScrollData } from "actions/ui/excel/scrollData";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { updateSheetCellData } from "actions/ui/excel/sheetCellData";
import { updateSheetColumnWidths } from "actions/ui/excel/sheetColumnWidths";
import { updateSheetRowHeights } from "actions/ui/excel/sheetRowHeights";


import { 
  isPositionEqualArea, 
  getScrollbarSize, 
  getEstimatedTotalHeight, 
  getEstimatedTotalWidth, 
  getCellData, 
  getTopOffsets,
  getLeftOffsets,
  convertTextToEditorState, 
  convertRichTextToEditorState,
  getNormalColumnWidth,
  getNormalRowHeight,
  getExcelColumnWidth,
  getExcelRowHeight,
  getResizeOffset,
  clearEditorStateText
} from "tools/excel";

import {
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER
} from "constants/excel";


import { REST_ADMIN_BUSINESS_CONCEPTS, REST_ADMIN_TEMPLATES } from "constants/rest";

const mapStateToProps = ({ 
  ui: { 
    excel
  } 
}) => excel;

const mapDispatchToProps = (dispatch) => ({
  handleUpdateActiveCellPosition: (activeCellPosition) => dispatch(updateActiveCellPosition(activeCellPosition)),

  handleUpdateActiveSelectionArea: (activeSelectionArea) => dispatch(updateActiveSelectionArea(activeSelectionArea)),
  handleResetActiveSelectionArea: () => dispatch(resetActiveSelectionArea()),

  handleUpdateActiveCellSelectionAreaIndex: (activeCellSelectionAreaIndex) => dispatch(updateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex)),
  handleResetActiveCellSelectionAreaIndex: () => dispatch(resetActiveCellSelectionAreaIndex()),

  handleUpdateStagnantSelectionAreas: (stagnantSelectionAreas) => dispatch(updateStagnantSelectionAreas(stagnantSelectionAreas)),
  handleResetStagnantSelectionAreas: () => dispatch(resetStagnantSelectionAreas()),

  handleSetSelectionModeOn: () => dispatch(setSelectionModeOn()),
  handleSetSelectionModeOff: () => dispatch(setSelectionModeOff()),

  handleSetEditModeOn: () => dispatch(setEditModeOn()),
  handleSetEditModeOff: () => dispatch(setEditModeOff()),

  handleUpdateScrollData: (scrollData) => dispatch(updateScrollData(scrollData)),

  handleChangeSheetCellData: (sheetName, sheetsCellData) => dispatch(updateSheetCellData(sheetName, sheetsCellData)),

  handleUpdateActiveCellInputData: (value) => dispatch(updateActiveCellInputData(value)),
  handleResetActiveCellInputData: () => dispatch(resetActiveCellInputData()),

  handleSetActiveCellInputAutoFocusOn: () => dispatch(setActiveCellInputAutoFocusOn()),
  handleSetActiveCellInputAutoFocusOff: () => dispatch(setActiveCellInputAutoFocusOff()),

  handleUpdateCursorType: (cursorType) => dispatch(updateCursorType(cursorType)),
  handleResetCursorType: () => dispatch(resetCursorType()),

  handleUpdateRowResizeData: (rowResizeData) => dispatch(updateRowResizeData(rowResizeData)),
  handleResetRowResizeData: () => dispatch(resetRowResizeData()),
  
  handleUpdateColumnResizeData: (columnResizeData) => dispatch(updateColumnResizeData(columnResizeData)),
  handleResetColumnResizeData: () => dispatch(resetColumnResizeData()),
  
  handleUpdateFreezeRowResizeData: (freezeRowResizeData) => dispatch(updateFreezeRowResizeData(freezeRowResizeData)),
  handleResetFreezeRowResizeData: () => dispatch(resetFreezeRowResizeData()),
  
  handleUpdateFreezeColumnResizeData: (freezeColumnResizeData) => dispatch(updateFreezeColumnResizeData(freezeColumnResizeData)),
  handleResetFreezeColumnResizeData: () => dispatch(resetFreezeColumnResizeData()),

  handleSetColumnResizeModeOn: () => dispatch(setColumnResizeModeOn()),
  handleSetColumnResizeModeOff: () => dispatch(setColumnResizeModeOff()),
  
  handleSetRowResizeModeOn: () => dispatch(setRowResizeModeOn()),
  handleSetRowResizeModeOff: () => dispatch(setRowResizeModeOff()),

  handleSetFreezeColumnResizeModeOn: () => dispatch(setFreezeColumnResizeModeOn()),
  handleSetFreezeColumnResizeModeOff: () => dispatch(setFreezeColumnResizeModeOff()),
  
  handleSetFreezeRowResizeModeOn: () => dispatch(setFreezeRowResizeModeOn()),
  handleSetFreezeRowResizeModeOff: () => dispatch(setFreezeRowResizeModeOff()),

  handleUpdateSheetRowHeights: (sheetRowHeights) => dispatch(updateSheetRowHeights(sheetRowHeights)),

  handleUpdateSheetColumnWidths: (sheetColumnWidths) => dispatch(updateSheetColumnWidths(sheetColumnWidths))
});

let EventListener = (props) => {
  const { sheetRowHeights, sheetRowCount, sheetColumnWidths, sheetColumnCount } = props;

  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  return (
    <EventRedux 
      ref={props.eventListenerRef} 
      topOffsets={topOffsets}
      leftOffsets={leftOffsets}
      {...props}
    />  
  );
};

EventListener = connect(mapStateToProps, mapDispatchToProps)(EventListener);

export default EventListener;

class EventRedux extends PureComponent {
  constructor(props) {
    super(props);
  }

  arrowUp(event, shiftKey) {
    let { 
      activeCellPosition,
      activeCellSelectionAreaIndex,
      isEditMode,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;
    
    if(shiftKey) { 
      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, y1, x2, y2 } = focusedStagnantSelectionArea;

        if(y1 > y || y2 > y) {
          if(y1 > y) {
            focusedStagnantSelectionArea.y1 -= 1;
            this._scrollTo(focusedStagnantSelectionArea.y1, x1)
          } else {
            focusedStagnantSelectionArea.y2 -= 1;
            this._scrollTo(focusedStagnantSelectionArea.y2, x2);
          }
          
          if(isPositionEqualArea(activeCellPosition, focusedStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
            handleResetActiveCellSelectionAreaIndex();
          } else {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        } else {
          if(y1 < y) {
            focusedStagnantSelectionArea.y1 -= 1;
            this._scrollTo(focusedStagnantSelectionArea.y1, x1);
          } else {
            focusedStagnantSelectionArea.y2 -= 1;
            this._scrollTo(focusedStagnantSelectionArea.y2, x2);
          }

          if(focusedStagnantSelectionArea.y1 > 0 && focusedStagnantSelectionArea.y2 > 0) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      } else {
        const y2 = y - 1;

        this._scrollTo(y2, x);
        if(y2 > 0) {
          handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
          if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
        }
      }
    } else {
      y--;
  
      if(y > 0) this.updateActiveCellPosition(y, x);
      if(stagnantSelectionAreasLength) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowDown(event, shiftKey) {
    let { 
      activeCellPosition,
      isEditMode,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex,
      sheetRowCount
    } = this.props;

    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(shiftKey) { 
      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, y1, x2, y2 } = focusedStagnantSelectionArea;

        if(y1 < y || y2 < y) {
          if(y1 < y) {
            focusedStagnantSelectionArea.y1 += 1;
            this._scrollTo(focusedStagnantSelectionArea.y2, x1)
          } else {
            focusedStagnantSelectionArea.y2 += 1;
            this._scrollTo(focusedStagnantSelectionArea.y2, x2);
          }

          if(isPositionEqualArea(activeCellPosition, focusedStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
            handleResetActiveCellSelectionAreaIndex();
          } else {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        } else {
          if(y1 > y) {
            focusedStagnantSelectionArea.y1 += 1;
            this._scrollTo(focusedStagnantSelectionArea.y1, x1)
          } else {
            focusedStagnantSelectionArea.y2 += 1;
            this._scrollTo(focusedStagnantSelectionArea.y2, x2);
          }

          if(focusedStagnantSelectionArea.y1 < sheetRowCount && focusedStagnantSelectionArea.y2 < sheetRowCount) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      
      } else {
        const y2 = y + 1;

        this._scrollTo(y2, x);
        if(y2 < sheetRowCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      y++;
      
      if(y < sheetRowCount) this.updateActiveCellPosition(y, x);
      if(stagnantSelectionAreasLength) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowLeft(event, shiftKey) {
    let { 
      activeCellPosition,
      activeCellSelectionAreaIndex,
      isEditMode,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();
    
    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(shiftKey) { 
      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, y1, x2, y2 } = focusedStagnantSelectionArea;

        if(x1 > x || x2 > x) {
          if(x1 > x) {
            focusedStagnantSelectionArea.x1 -= 1;
            this._scrollTo(y1, focusedStagnantSelectionArea.x1)
          } else {
            focusedStagnantSelectionArea.x2 -= 1;
            this._scrollTo(y2, focusedStagnantSelectionArea.x2);
          }
          
          if(isPositionEqualArea(activeCellPosition, focusedStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
            handleResetActiveCellSelectionAreaIndex();
          } else {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        } else {
          if(x1 < x) {
            focusedStagnantSelectionArea.x1 -= 1 ;
            this._scrollTo(y1, focusedStagnantSelectionArea.x1) 
          } else {
            focusedStagnantSelectionArea.x2 -= 1;
            this._scrollTo(y2, focusedStagnantSelectionArea.x2);
          }

          if(focusedStagnantSelectionArea.x1 > 0 && focusedStagnantSelectionArea.x2 > 0) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      } else {
        const x2 = x - 1;

        this._scrollTo(y, x2);
        if(x2 > 0) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      x--;
  
      if(x > 0) this.updateActiveCellPosition(y, x);
      if(stagnantSelectionAreasLength) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowRight(event, shiftKey) {
    let { 
      activeCellPosition,
      activeCellSelectionAreaIndex,
      isEditMode,
      sheetColumnCount,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();
    
    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;
    
    if(shiftKey) { 
      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, y1, x2, y2 } = focusedStagnantSelectionArea;

        if(x1 < x || x2 < x) {
          if(x1 < x) {
            focusedStagnantSelectionArea.x1 += 1 
            this._scrollTo(y1, focusedStagnantSelectionArea.x1);
          } else {
            focusedStagnantSelectionArea.x2 += 1;
            this._scrollTo(y2, focusedStagnantSelectionArea.x2);
          }
          
          if(isPositionEqualArea(activeCellPosition, focusedStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
            handleResetActiveCellSelectionAreaIndex();
          } else {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        } else {
          if(x1 > x) {
            focusedStagnantSelectionArea.x1 += 1;
            this._scrollTo(y1, focusedStagnantSelectionArea.x1);
          } else {
            focusedStagnantSelectionArea.x2 += 1;
            this._scrollTo(y2, focusedStagnantSelectionArea.x2);
          }

          if(focusedStagnantSelectionArea.x1 < sheetColumnCount && focusedStagnantSelectionArea.x2 < sheetColumnCount) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      } else {
        const x2 = x + 1;

        this._scrollTo(y, x2);
        if(x2 < sheetColumnCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      x++;
  
      if(x < sheetColumnCount) this.updateActiveCellPosition(y, x);
      if(stagnantSelectionAreasLength) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  tab(event, shiftKey, sheetContainerRef) {
    let { 
      isEditMode,

      activeCellPosition, 
      activeSelectionArea, 
      stagnantSelectionAreas, 
      activeCellSelectionAreaIndex,

      sheetRowCount,
      sheetColumnCount,

      handleUpdateActiveCellSelectionAreaIndex
    } = this.props;

    event.preventDefault();

    const { current: SheetContainerInstance } = sheetContainerRef;

    let { x, y } = activeCellPosition;

    if(isEditMode) {
      this.saveActiveCellInputData();

      SheetContainerInstance.focus();
    }

    let selectionArea;
    let isBounded;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    // Get the rectangular scope that an active selection area can go in
    // TODO : clean up later
    if(activeSelectionArea || stagnantSelectionAreasLength) {
      if(activeSelectionArea) {
        // It is possible to have the active cell go over both active area and stagnant areas
        if(stagnantSelectionAreasLength) {
          // ! Make the first upper outer bound be the indicator that the active cell is in the acive selection area
          // ! When it's not out of bound, the cell is in a stagnant selection area
          if(stagnantSelectionAreasLength === activeCellSelectionAreaIndex) {
            selectionArea = activeSelectionArea;
          } else {
            selectionArea = stagnantSelectionAreas[activeCellSelectionAreaIndex];
          }
        } else {
          selectionArea = activeSelectionArea;
        }
      } else {
        selectionArea = stagnantSelectionAreas[activeCellSelectionAreaIndex];
      } 

      isBounded = false
    } else {
      isBounded = true;

      selectionArea = { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 };
    }

    let { x1, y1, x2, y2 } = selectionArea;

    shiftKey ? x-- : x++;
    
    // Check for bounds -- do not update when isbounded and tab goes out bounds
    if((x < x1 && x < x2) || (x > x1 && x > x2)) {
      if(!isBounded) {
        shiftKey ? y-- : y++;

        // Check for bounds in y
        if((y < y1 && y < y2) || (y > y1 && y > y2)) {
          // Need to switch selection areas. 
          (y < y1 && y < y2) ? activeCellSelectionAreaIndex-- : activeCellSelectionAreaIndex++;

          // Fix out of bounds result
          if((activeSelectionArea && activeCellSelectionAreaIndex === stagnantSelectionAreasLength + 1) || (!activeSelectionArea && activeCellSelectionAreaIndex === stagnantSelectionAreasLength)) {
            activeCellSelectionAreaIndex = 0;
          } else if(activeCellSelectionAreaIndex < 0) {
            activeSelectionArea ? activeCellSelectionAreaIndex = stagnantSelectionAreasLength : activeCellSelectionAreaIndex = stagnantSelectionAreasLength - 1;
          }

          let newSelectionArea = (activeCellSelectionAreaIndex === stagnantSelectionAreasLength) ? activeSelectionArea : stagnantSelectionAreas[activeCellSelectionAreaIndex]; 
          
          const { x1: newX1, y1: newY1, x2: newX2, y2: newY2 } = newSelectionArea;

          if(y < y1 && y < y2) {
            x = Math.max(newX1, newX2);
            y = Math.max(newY1, newY2);  
          } else {
            x = Math.min(newX1, newX2);
            y = Math.min(newY1, newY2);   
          }

          handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex);
        } else {
          // Make x go to its resepective end point (start or end) as a result of going out of bound
          x = (x < x1 && x < x2) ? Math.max(x1, x2) : Math.min(x1, x2);
        }

        this.updateActiveCellPosition(y, x);
      }
    } else {
      this.updateActiveCellPosition(y, x);
    }
  }

  enter(event, shiftKey, sheetContainerRef) {
    let { 
      isEditMode,

      activeCellSelectionAreaIndex,
      activeCellPosition, 
      activeSelectionArea, 
      stagnantSelectionAreas, 

      sheetRowCount,
      sheetColumnCount,

      handleUpdateActiveCellSelectionAreaIndex
    } = this.props;
    event.preventDefault();

    let { x, y } = activeCellPosition;

    const { current: SheetContainerInstance } = sheetContainerRef;

    if(isEditMode) {
      this.saveActiveCellInputData();

      SheetContainerInstance.focus();
    } else if(!isEditMode && activeCellSelectionAreaIndex === -1) {
      this.setEditModeOn();

      return;
    }

    let selectionArea;
    let isBounded;

    let x1;
    let y1;
    let x2;
    let y2;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    // Get the rectangular scope that an active selection area can go in
    // TODO : clean up later
    if(activeSelectionArea || stagnantSelectionAreasLength) {
      isBounded = false;

      if(activeSelectionArea) {
        // It is possible to have the active cell go over both active area and stagnant areas
        if(stagnantSelectionAreasLength) {
          // ! Make the first upper outer bound be the indicator that the active cell is in the acive selection area
          // ! When it's not out of bound, the cell is in a stagnant selection area
          if(stagnantSelectionAreasLength === activeCellSelectionAreaIndex) {
            selectionArea = activeSelectionArea;
          } else {
            selectionArea = stagnantSelectionAreas[activeCellSelectionAreaIndex];
          }
        } else {
          selectionArea = activeSelectionArea;
        }
      } else {
        selectionArea = stagnantSelectionAreas[activeCellSelectionAreaIndex];
      } 

      x1 = selectionArea.x1;
      y1 = selectionArea.y1;
      x2 = selectionArea.x2;
      y2 = selectionArea.y2;
    } else {
      isBounded = true;

      x1 = 1;
      y1 = 1;
      x2 = sheetColumnCount - 1;
      y2 = sheetRowCount - 1;
    }
    
    shiftKey ? y-- : y++;
    
    // Check for bounds -- do not update when isbounded and tab goes out bounds
    if((y < y1 && y < y2) || (y > y1 && y > y2)) {
      if(!isBounded) {
        shiftKey ? x-- : x++;
        // Check for bounds in x
        if((x < x1 && x < x2) || (x > x1 && x > x2)) {
          // Need to switch selection areas. 
          (x < x1 && x < x2) ? activeCellSelectionAreaIndex-- : activeCellSelectionAreaIndex++;

          // Fix out of bounds result
          if((activeSelectionArea && activeCellSelectionAreaIndex === stagnantSelectionAreasLength + 1) || (!activeSelectionArea && activeCellSelectionAreaIndex === stagnantSelectionAreasLength)) {
            activeCellSelectionAreaIndex = 0;
          } else if(activeCellSelectionAreaIndex < 0) {
            activeSelectionArea ? activeCellSelectionAreaIndex = stagnantSelectionAreasLength : activeCellSelectionAreaIndex = stagnantSelectionAreasLength - 1;
          }

          let newSelectionArea = (activeCellSelectionAreaIndex === stagnantSelectionAreasLength) ? activeSelectionArea : stagnantSelectionAreas[activeCellSelectionAreaIndex]; 
          
          const { x1: newX1, y1: newY1, x2: newX2, y2: newY2 } = newSelectionArea;

          if(x < x1 && x < x2) {
            x = Math.max(newX1, newX2);
            y = Math.max(newY1, newY2);  
          } else {
            x = Math.min(newX1, newX2);
            y = Math.min(newY1, newY2);
          }

          handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex);
        } else {
          // Make y go to its resepective end point (start or end) as a result of going out of bound
          y = (y < y1 && y < y2) ? Math.max(y1, y2) : Math.min(y1, y2);
        }

        this.updateActiveCellPosition(y, x);
      }
    } else {
      this.updateActiveCellPosition(y, x);
    }
  }

  delete() {
    const { 
      isEditMode,
      activeCellSelectionAreaIndex,
      activeSelectionArea,
      activeCellPosition,
      stagnantSelectionAreas,

      sheetCellData,

      handleChangeSheetCellData,
      handleUpdateActiveCellInputData
    } = this.props;

    if(isEditMode) return;

    const { x, y } = activeCellPosition;

    if(activeCellSelectionAreaIndex >= 0) {
      // { row: column }
      let selectionAreaCoveredCells = {};

      let combinedSelectionArea = activeSelectionArea ? [ ...stagnantSelectionAreas, activeSelectionArea ] : [ ...stagnantSelectionAreas ];

      combinedSelectionArea.forEach(({ x1, x2, y1, y2 }) => {
        let startRow = Math.min(y1, y2);
        let endRow = Math.max(y1, y2);
  
        let startColumn = Math.min(x1, x2);
        let endColumn = Math.max(x1, x2);

        for(let row = startRow; row <= endRow; row++) {
          for(let column = startColumn; column <= endColumn; column++) {
            if(selectionAreaCoveredCells[row]) {
              selectionAreaCoveredCells[row][column] = true;
            } else {
              selectionAreaCoveredCells[row] = { [column]: true };
            }
          }
        }
      });

      let newSheetCellData = { ...sheetCellData };

      for(let row in selectionAreaCoveredCells) {
        let columns = Object.keys(selectionAreaCoveredCells[row]);

        columns.forEach((column) => {
          // ! Consider when everything is undefined -- do you remove it from sheet data?
          // ! Consider normal/rich text
          if(newSheetCellData[row] && newSheetCellData[row][column]) {
            newSheetCellData[row][column] = { ...newSheetCellData[row][column], value: undefined };
          }
        });
      }

      handleChangeSheetCellData(newSheetCellData);
    } else {
      
      if(sheetCellData[y] && sheetCellData[y][x]) this.changeValue(y, x, { ...sheetCellData[y][x], value: undefined });
    }

    const cellData = sheetCellData[y] && sheetCellData[y][x] ? sheetCellData[y][x] : undefined;

    const type = cellData ? cellData.type : undefined;
    const value = cellData ? cellData.value : undefined;

    handleUpdateActiveCellInputData({ editorState: type === "rich-text" ? convertRichTextToEditorState(value) : convertTextToEditorState(value) });
  }

  changeActiveInputData(data) {
    const { handleUpdateActiveCellInputData } = this.props;

    handleUpdateActiveCellInputData(data);
  }

  changeValue(row, column, newData) {
    const { 
      sheetCellData, 
      handleChangeSheetCellData 
    } = this.props;
    
    const { value: newValue } = newData;

    const currentCellData = getCellData(sheetCellData, row, column);

    // ! Need a deep clone here!
    let newSheetCellData = { ...sheetCellData };

    // ! Need to consider other parameters other than value!!
    // ! Only update if data changed!
    if(currentCellData) {
      if(currentCellData !== newValue) {
        newSheetCellData[row][column] = { ...currentCellData, value: newValue };
        handleChangeSheetCellData(newSheetCellData);
      }
    } else {
      // ! Change type?
      if(!newSheetCellData[row]) newSheetCellData[row] = {};
      newSheetCellData[row][column] = { type: "normal", value: newValue };
      handleChangeSheetCellData(newSheetCellData);
    }
  }

  focusFormulaInput() {
    this.setInputAutoFocusOff();
    this.setEditModeOn();
  }

  blurFormulaInput() {
    this.setInputAutoFocusOn();
  }

  // TODO : Consider no stagnant selection area
  clickRowHeader(row, ctrlKey) {
    const {
      activeCellPosition,
      sheetColumnCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
    } = this.props;
    
    this.saveActiveCellInputData();

    this.updateActiveCellPosition(row, 1);

    const rowArea = { x1: 1, y1: row, x2: sheetColumnCount - 1, y2: row };

    
    if(ctrlKey) {
      const { x, y } = activeCellPosition;

      let newStagnantSelectionAreas = [];

      if(stagnantSelectionAreas.length) {
        newStagnantSelectionAreas = [ ...stagnantSelectionAreas ];
      } else if(y !== row) {
        newStagnantSelectionAreas.push({ x1: x, x2: x, y1: y, y2: y });
      }

      newStagnantSelectionAreas.push(rowArea);

      handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex + 1);
      handleUpdateStagnantSelectionAreas(newStagnantSelectionAreas);
    } else {
      handleUpdateActiveCellSelectionAreaIndex(0);
      handleUpdateStagnantSelectionAreas([ rowArea ]);
    }
  }

  clickColumnHeader(column, ctrlKey) {
    const {
      activeCellPosition,
      sheetRowCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
    } = this.props;

    this.saveActiveCellInputData();

    const columnArea = { x1: column, y1: 1, x2: column, y2: sheetRowCount - 1 };

    if(ctrlKey) {
      const { x, y } = activeCellPosition;

      let newStagnantSelectionAreas = [];

      if(stagnantSelectionAreas.length) {
        newStagnantSelectionAreas = [ ...stagnantSelectionAreas ];
      } else if(x !== column) {
        newStagnantSelectionAreas.push({ x1: x, x2: x, y1: y, y2: y });
      }

      newStagnantSelectionAreas.push(columnArea);

      handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex + 1);
      handleUpdateStagnantSelectionAreas(newStagnantSelectionAreas);
    } else {
      handleUpdateActiveCellSelectionAreaIndex(0);
      handleUpdateStagnantSelectionAreas([ columnArea ]);
    }

    this.updateActiveCellPosition(1, column);
  }

  saveActiveCellInputData() {
    const { isEditMode, activeCellInputData: { editorState }, activeCellPosition } = this.props;

    if(isEditMode) {
      const { x, y } = activeCellPosition;

      this.changeValue(y, x, { value: editorState.getCurrentContent().getPlainText() });

      this.setEditModeOff();
    }
  }

  selectAll(event) {
    const {
      sheetColumnCount,
      sheetRowCount,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
    } = this.props;

    if(event) event.preventDefault();

    this.saveActiveCellInputData();

    handleUpdateActiveCellSelectionAreaIndex(0);
    handleUpdateStagnantSelectionAreas([ { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 } ]);
  }

  startEditMode() {
    const { 
      sheetCellData,
      activeCellPosition: { x, y },
      isEditMode
    } = this.props;
    if(isEditMode) return;

    // !Change this?
    this.setEditModeOn();
  }

  doubleClickEditableCell() {
    this.setEditModeOn();
  }

  escape(sheetContainerRef) {
    const { 
      isEditMode,
      // activeCellInputAutoFocus,
      sheetCellData,
      activeCellPosition: { x, y },
      handleUpdateActiveCellInputData
    } = this.props;

    if(isEditMode) {
      const { current: SheetContainerInstance } = sheetContainerRef;
      
      this.setEditModeOff();

      const cellData = sheetCellData[y] && sheetCellData[y][x] ? sheetCellData[y][x] : undefined;

      const type = cellData ? cellData.type : undefined;
      const value = cellData ? cellData.value : undefined;
      
      handleUpdateActiveCellInputData({ editorState: type === "rich-text" ? convertRichTextToEditorState(value) : convertTextToEditorState(value) });

      SheetContainerInstance.focus();
    }
  }

  // ! TODO - Break squares, and deselect stagnant areas with the same area as the active selection
  mouseUp(ctrlKey) {
    const { 
      sheetGridRef,
      isSelectionMode, 
      cursorType,

      columnResizeData,
      rowResizeData,
      freezeColumnResizeData,
      freezeRowResizeData,

      sheetFreezeColumnCount,
      sheetFreezeRowCount,

      sheetRowHeights,
      sheetColumnWidths,

      leftOffsets,
      topOffsets,

      scrollData,

      activeSelectionArea, 
      stagnantSelectionAreas, 
      handleResetActiveSelectionArea, 
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex, 
      handleResetActiveCellSelectionAreaIndex,
      handleResetCursorType,
      handleResetColumnResizeData,
      handleSetRowResizeModeOff,
      handleResetRowResizeData,
      handleSetColumnResizeModeOff,
      handleUpdateSheetRowHeights,
      handleUpdateSheetColumnWidths
    } = this.props;

    if(isSelectionMode) {
      this.setSelectionModeOff();
  
      if(activeSelectionArea) {
        const { x1, y1, x2, y2 } = activeSelectionArea;
    
        if((x1 !== x2 || y1 !== y2) || ctrlKey) {
          const newStagnantSelectionAreas = [ ...stagnantSelectionAreas, activeSelectionArea ];
          handleUpdateStagnantSelectionAreas(newStagnantSelectionAreas);
          handleUpdateActiveCellSelectionAreaIndex(newStagnantSelectionAreas.length - 1);
        } else {
          handleResetActiveCellSelectionAreaIndex();
        }

        handleResetActiveSelectionArea();
      } else if(!ctrlKey) {
        handleResetActiveCellSelectionAreaIndex();
      } 
    } else if(cursorType) {
      if(cursorType !== "default") handleResetCursorType();

      if(rowResizeData) {
        const { row, offset } = rowResizeData;
        const rowTopOffset = topOffsets[row];
        const { scrollTop } = scrollData;

        const sheetFreezeRowEndOffset = topOffsets[sheetFreezeRowCount] + (sheetFreezeRowCount ? getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER);

        const rowHeight = getNormalRowHeight(sheetRowHeights[row]);
        const currentOffset = rowTopOffset + rowHeight;
        
        let newRowHeight = offset - rowTopOffset;

        if(row <= sheetFreezeRowCount && offset > sheetFreezeRowEndOffset) newRowHeight -= scrollTop;

        if(offset !== currentOffset) {
          handleUpdateSheetRowHeights({ ...sheetRowHeights, [row]: getExcelRowHeight(newRowHeight) });
          sheetGridRef.current.resetAfterRowIndex(row);
        } 
        
        handleSetRowResizeModeOff();
        handleResetRowResizeData();
      } else if(columnResizeData) {
        const { column, offset } = columnResizeData;
        const { scrollLeft } = scrollData;

        const sheetFreezeColumnEndOffset = leftOffsets[sheetFreezeColumnCount] + (sheetFreezeColumnCount ? getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER);

        const columnLeftOffset = leftOffsets[column];
        const columnWidth = getNormalColumnWidth(sheetColumnWidths[column]);
        const currentOffset = columnLeftOffset + columnWidth;

        let newColumnWidth = offset - columnLeftOffset;

        if(column <= sheetFreezeColumnCount && offset > sheetFreezeColumnEndOffset) newColumnWidth -= scrollLeft;

        if(offset !== currentOffset) {
          handleUpdateSheetColumnWidths({ ...sheetColumnWidths, [column]: getExcelColumnWidth(newColumnWidth) });
          sheetGridRef.current.resetAfterColumnIndex(column);
        }

        handleSetColumnResizeModeOff();
        handleResetColumnResizeData();
      } else if(freezeRowResizeData) {

      } else if(freezeColumnResizeData) {

      }
    }
  }

  mouseMove(sheetContainerRef, xOffset, yOffset) {
    const { 
      topOffsets,
      leftOffsets,
      sheetRowHeights,
      sheetColumnWidths,
      isSelectionMode,
      scrollData,
      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      rowResizeData,
      columnResizeData,
      freezeRowResizeData,
      freezeColumnResizeData,
      isColumnResizeMode,
      isFreezeColumnResizeMode,
      isRowResizeMode,
      isFreezeRowResizeMode,
      handleUpdateRowResizeData,
      handleUpdateColumnResizeData,
      handleUpdateFreezeColumnResizeData,
      handleUpdateFreezeRowResizeData,
      
    } = this.props;

    if(
      isSelectionMode
      || (
        !isColumnResizeMode
        && !isFreezeColumnResizeMode
        && !isRowResizeMode
        && !isFreezeRowResizeMode
      )
    ) return;

    const { current: SheetContainerInstance } = sheetContainerRef;
    let { scrollTop, scrollLeft } = scrollData;

    if(isRowResizeMode) {
      const { row } = rowResizeData;
      const rowOffset = topOffsets[row];
      const { clientHeight } = SheetContainerInstance;
      const freezeRowOffset = topOffsets[sheetFreezeRowCount] + (sheetFreezeRowCount ? getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER);

      const componentOffset = SheetContainerInstance.offsetTop;

      const scrollbarSize = getScrollbarSize();

      // Do not consider scroll offset when freeze
      let adjustedScrollOffset = row <= sheetFreezeRowCount ? 0 : scrollTop; 
    
      const minScrollOffset = adjustedScrollOffset;
      const maxScrollOffset = adjustedScrollOffset + clientHeight - scrollbarSize;
    
      const possibleMaxOffset = Math.max(rowOffset, maxScrollOffset);
      const possibleMinOffset = Math.max(rowOffset, minScrollOffset);
    
      let adjustedOffset = yOffset + adjustedScrollOffset - componentOffset;
    
      if(adjustedOffset < possibleMinOffset) {
        adjustedOffset = possibleMinOffset;
      } else if(adjustedOffset > possibleMaxOffset) {
        adjustedOffset = possibleMaxOffset;
      };

      if(adjustedOffset > freezeRowOffset && row <= sheetFreezeRowCount) adjustedOffset += scrollTop;
    
      handleUpdateRowResizeData({ offset: adjustedOffset });
    } else if(isColumnResizeMode) {
      const { column } = columnResizeData;
      const columnOffset = leftOffsets[column];
      const freezeColumnOffset = leftOffsets[sheetFreezeColumnCount] + (sheetFreezeColumnCount ? getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER);

      const { clientWidth } = SheetContainerInstance;

      const componentOffset = SheetContainerInstance.offsetLeft;

      const scrollbarSize = getScrollbarSize();

      // Do not consider scroll offset when freeze
      let adjustedScrollOffset = column <= sheetFreezeColumnCount ? 0 : scrollLeft; 
    
      const minScrollOffset = adjustedScrollOffset;
      const maxScrollOffset = adjustedScrollOffset + clientWidth - scrollbarSize;
    
      const possibleMaxOffset = Math.max(columnOffset, maxScrollOffset);
      const possibleMinOffset = Math.max(columnOffset, minScrollOffset);
    
      let adjustedOffset = xOffset + adjustedScrollOffset - componentOffset;
    
      if(adjustedOffset < possibleMinOffset) {
        adjustedOffset = possibleMinOffset;
      } else if(adjustedOffset > possibleMaxOffset) {
        adjustedOffset = possibleMaxOffset;
      };

      if(adjustedOffset > freezeColumnOffset && column <= sheetFreezeColumnCount) {
        adjustedOffset += scrollLeft;
      }

      handleUpdateColumnResizeData({ offset: adjustedOffset });
    } else if(isFreezeRowResizeMode) {

    } else if(isFreezeColumnResizeMode) {

    } 
  }

  startSelection(x1, y1, ctrlKey, shiftKey) {
    const { 
      activeCellPosition, 
      stagnantSelectionAreas, 
      handleResetStagnantSelectionAreas, 
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveSelectionArea, 
      handleUpdateActiveCellSelectionAreaIndex 
    } = this.props;

    const { x, y } = activeCellPosition;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;
    
    if((!ctrlKey && stagnantSelectionAreasLength) || shiftKey) handleResetStagnantSelectionAreas(); 

    this.saveActiveCellInputData();

    this.setSelectionModeOn();

    if(ctrlKey || shiftKey) {
      let x2;
      let y2;

      let newActiveCellSelectionAreaIndex;
      if(shiftKey) {
        x2 = x1;
        y2 = y1;
        x1 = x;
        y1 = y;
  
        newActiveCellSelectionAreaIndex = 0;
      } else if(ctrlKey) {
        x2 = x1;
        y2 = y1;

        newActiveCellSelectionAreaIndex = stagnantSelectionAreasLength + 1;
        
        if(!stagnantSelectionAreasLength && (x1 !== x || y1 !== y)) handleUpdateStagnantSelectionAreas([ { x1: x, y1: y, x2: x, y2: y } ]);
      } 

      handleUpdateActiveSelectionArea({ x1, y1, x2, y2 });
      handleUpdateActiveCellSelectionAreaIndex(newActiveCellSelectionAreaIndex);
    }

    this.updateActiveCellPosition(y1, x1, false);
  }

  selectOver(x2, y2, ctrlKey) {
    const { 
      isSelectionMode, 
      activeCellPosition, 
      stagnantSelectionAreas, 
      activeCellSelectionAreaIndex, 
      handleResetStagnantSelectionAreas, 
      handleResetActiveSelectionArea, 
      handleUpdateActiveSelectionArea, 
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(!isSelectionMode) return;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(!ctrlKey && stagnantSelectionAreasLength) handleResetStagnantSelectionAreas(); 

    const { x, y } = activeCellPosition;

    if(x === x2 && y === y2 && !ctrlKey) {
      handleResetActiveSelectionArea();
      handleResetActiveCellSelectionAreaIndex();
    } else {
      handleUpdateActiveSelectionArea({ x1: x, y1: y, x2, y2 });
      if(stagnantSelectionAreasLength !== activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(stagnantSelectionAreasLength);
    }
  }

  setSelectionModeOn() {
    const { isSelectionMode, handleSetSelectionModeOn } = this.props;

    if(!isSelectionMode) handleSetSelectionModeOn();
  }

  setSelectionModeOff() {
    const { isSelectionMode, handleSetSelectionModeOff } = this.props;

    if(isSelectionMode) handleSetSelectionModeOff();
  }

  setEditModeOn() {
    const { isEditMode, isSelectionMode, handleSetEditModeOn, handleSetSelectionModeOff } = this.props;
    if(!isEditMode) handleSetEditModeOn();

    if(isSelectionMode) handleSetSelectionModeOff();
  }

  setEditModeOff() {
    const { isEditMode, handleSetEditModeOff } = this.props;

    if(isEditMode) handleSetEditModeOff();
  }

  resetActiveCellSelectionAreaIndex() {
    const { activeCellSelectionAreaIndex, handleResetActiveCellSelectionAreaIndex } = this.props;

    if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
  }

  resetActiveCellInputData() {
    const { handleResetActiveCellInputData } = this.props;
    handleResetActiveCellInputData();
  }

  updateActiveCellPosition(newY, newX, shouldScroll = true) {
    const { 
      sheetCellData, 

      handleUpdateActiveCellPosition, 
      handleUpdateActiveCellInputData 
    } = this.props;
    const cellData = sheetCellData[newY] && sheetCellData[newY][newX] ? sheetCellData[newY][newX] : undefined;

    const type = cellData ? cellData.type : undefined;
    const value = cellData ? cellData.value : undefined;

    handleUpdateActiveCellInputData({ editorState: type === "rich-text" ? convertRichTextToEditorState(value) : convertTextToEditorState(value) });

    handleUpdateActiveCellPosition({ x: newX, y: newY });

    if(shouldScroll) this._scrollTo(newY, newX);
  }

  _scrollTo(newY, newX) {
    const {
      sheetGridRef,
      sheetColumnCount,
      sheetRowCount,
      sheetFreezeColumnCount,
      sheetFreezeRowCount,

      topOffsets,
      leftOffsets,
      sheetColumnWidths,
      sheetRowHeights,

      scrollData,
    } = this.props;

    if(newY >= sheetRowCount) {
      newY = sheetRowCount - 1;
    } else if(newY <= 0) {
      newY = 1;
    }

    if(newX >= sheetColumnCount) {
      newX = sheetColumnCount - 1;
    } else if(newX <= 0) {
      newX = 1;
    }

    let { scrollTop, scrollLeft } = scrollData;

    const topFreezeStart = topOffsets[sheetFreezeRowCount];
    const leftFreezeStart = leftOffsets[sheetFreezeColumnCount];
    const heightFreezeStart = sheetFreezeRowCount ? getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER;
    const widthFreezeStart = sheetFreezeColumnCount ? getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;

    const topActiveStart = topOffsets[newY];
    const leftActiveStart = leftOffsets[newX];
    const heightActiveStart = getNormalRowHeight(sheetRowHeights[newY]);
    const widthActiveStart = getNormalColumnWidth(sheetColumnWidths[newX]);

    const freezeHeight = topFreezeStart + heightFreezeStart;
    const freezeWidth = leftFreezeStart + widthFreezeStart;

    const { current: { props, props: { height, width }, _instanceProps } } = sheetGridRef;

    const scrollbarSize = getScrollbarSize();

    let newScrollTop;
    let newScrollLeft;

    const estimatedTotalHeight = getEstimatedTotalHeight(props, _instanceProps);
    const estimatedTotalWidth = getEstimatedTotalWidth(props, _instanceProps);

    // The scrollbar size should be considered when scrolling an item into view,
    // to ensure it's fully visible.
    // But we only need to account for its size when it's actually visible.
    const horizontalScrollbarSize = estimatedTotalWidth > width ? scrollbarSize : 0;
    const verticalScrollbarSize = estimatedTotalHeight > height ? scrollbarSize : 0;

    // Active cell is under freeze
    if(newY > sheetFreezeRowCount && topActiveStart < scrollTop + freezeHeight) {
      newScrollTop = topActiveStart - freezeHeight;
    // Beyond bottom side
    } else if(topActiveStart + heightActiveStart > scrollTop + height - horizontalScrollbarSize){
      newScrollTop = topActiveStart + heightActiveStart - height + horizontalScrollbarSize;
    }
    
    if(newX > sheetFreezeColumnCount && leftActiveStart < scrollLeft + freezeWidth) {
      newScrollLeft = leftActiveStart - freezeWidth;
    // Beyond visible right side
    } else if(leftActiveStart + widthActiveStart > scrollLeft + width - verticalScrollbarSize){
      newScrollLeft = leftActiveStart + widthActiveStart - width + verticalScrollbarSize;
    }

    if((newScrollTop !== undefined && newScrollTop !== scrollTop) || (newScrollLeft !== undefined && newScrollLeft !== scrollLeft)) sheetGridRef.current.scrollTo({ scrollTop: newScrollTop, scrollLeft: newScrollLeft });
  }

  scroll(scrollData) {
    const { handleUpdateScrollData } = this.props;

    handleUpdateScrollData(scrollData);
  }

  setInputAutoFocusOn() {
    const { activeCellInputAutoFocus, handleSetActiveCellInputAutoFocusOn } = this.props;
    if(!activeCellInputAutoFocus) handleSetActiveCellInputAutoFocusOn();
  }

  setInputAutoFocusOff() {
    const { activeCellInputAutoFocus, handleSetActiveCellInputAutoFocusOff } = this.props;
    if(activeCellInputAutoFocus) handleSetActiveCellInputAutoFocusOff();
  }

  startColumnDrag(column) {
    const { 
      leftOffsets,
      sheetColumnWidths, 
      handleUpdateColumnResizeData,
      handleSetColumnResizeModeOn,
      handleUpdateCursorType
    } = this.props;
    const width = getNormalColumnWidth(sheetColumnWidths[column]);
    const columnOffset = leftOffsets[column];
    const offset = columnOffset + width;

    handleSetColumnResizeModeOn();
    handleUpdateColumnResizeData({ column, offset });
    handleUpdateCursorType("ew-resize");
  }

  startRowDrag(row) {
    const { 
      topOffsets,
      sheetRowHeights, 
      handleUpdateRowResizeData, 
      handleSetRowResizeModeOn,
      handleUpdateCursorType 
    } = this.props;
    const height = getNormalRowHeight(sheetRowHeights[row]);
    const rowOffset = topOffsets[row];
    const offset = rowOffset + height;

    handleSetRowResizeModeOn();
    handleUpdateRowResizeData({ row, offset });
    handleUpdateCursorType("ns-resize");
  }

  importId() {
    const { sheetCellData, sheetTemplateIdMapping } = this.props;

    let businessConcepts = {};

    let sheets = [ { sheetCellData, sheetTemplateIdMapping } ];

    const currentInactiveSheets = JSON.parse(sessionStorage.getItem("inactiveSheets"));

    for(let sheetName in currentInactiveSheets) sheets.push(JSON.parse(pako.inflate(currentInactiveSheets[sheetName], { to: "string" })));

    sheets.forEach((sheetData) => {
      const { 
        sheetCellData, 
        sheetTemplateIdMapping: {
          idRow,
          valueRow,
          isRowEnabled,
          idColumn,
          valueColumn,
          isColumnEnabled
        }
      } = sheetData;

      if(isRowEnabled) {
        let rowIds = sheetCellData[idRow];
        let rowValues = sheetCellData[valueRow];

        if(rowIds && rowValues) {
          for(let column in rowIds) {
            const columnIdData = rowIds[column];
            const columnValueData = rowValues[column];
            if(columnIdData && columnValueData) {
              const { value: id } = columnIdData;
              const { value } = columnValueData;
              if(parseInt(id) && value && value !== "undefined") businessConcepts[id] = value;
            }
          }
        }
      }

      if(isColumnEnabled) {
        for(let row in sheetCellData) {
          const rowData = sheetCellData[row];
          
          if(rowData) {
            const rowIdData = rowData[idColumn];
            const rowValueData = rowData[valueColumn];

            if(rowIdData && rowValueData) {
              const { value: id } = rowIdData;
              const { value } = rowValueData;

              if(parseInt(id) && value && value !== "undefined") businessConcepts[id] = value;
            }
          }
        }
      }
    });

    adminTemplateRoleAxios.post(`${REST_ADMIN_BUSINESS_CONCEPTS}/import`, { businessConcepts })
      .catch((error) => {
        console.error(error);
      });
  }

  saveTemplate(commonProps) {
    const {
      sheetTemplateIdMapping,
      isTemplatePublished,
      templateId
    } = this.props;

    commonProps.sheetTemplateIdMapping = sheetTemplateIdMapping;
    commonProps.isTemplatePublished = isTemplatePublished;

    const fileStates = extractReactAndWorkbookState(commonProps);

    const newTemplate = {
      published: isTemplatePublished,
      fileStates,
      name: fileStates.name
    };

    // ! Add more checks
    adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${templateId}`, { newTemplate })
      .catch((error) => console.error(error))
  }

  saveEditBundle(commonProps) {
    
  }

  saveReviewBundle(commonProps) {

  }

  saveApproveBundle(commonProps) {

  }

  save() {
    const {
      type,
      name,
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetHiddenColumns,
      sheetHiddenRows
    } = this.props;

    let commonProps = {
      name,
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetHiddenColumns,
      sheetHiddenRows,
    };

    if(type === "template") {
      this.saveTemplate(commonProps);
    } else if(type === "bundle_edit") {
      this.saveEditBundle(commonProps);
    } else if(type === "bundle_review") {
      this.saveReviewBundle(commonProps);
    } else if(type === "bundle_approve") {
      this.saveApproveBundle(commonProps);
    }
  }

  render() {
    return null;
  }
};
