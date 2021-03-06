import React, { PureComponent, useMemo } from "react";

import { 
  adminTemplateRoleAxios,
  adminEditBundleRoleAxios, 
  adminReviewBundleRoleAxios, 
  adminApproveBundleRoleAxios,
  adminBundleRoleAxios
} from "@tools/rest";

import { connect } from "react-redux";

import pako from "pako";

import cloneDeep from "clone-deep";

import uniqid from "uniqid";

import { loadSheet } from "@tools/redux";

import { extractReactAndWorkbookState } from "@tools/excel";

import { enableActiveCellInputAutoFocus, disableActiveCellInputAutoFocus } from "@actions/ui/excel/activeCellInputAutoFocus";
import { updateActiveCellInputData, resetActiveCellInputData } from "@actions/ui/excel/activeCellInputData";
import { updateActiveCellPosition } from "@actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "@actions/ui/excel/activeSelectionArea";
import { updateActiveCellSelectionAreaIndex, resetActiveCellSelectionAreaIndex } from "@actions/ui/excel/activeCellSelectionAreaIndex";

import { updateCursorType, resetCursorType } from "@actions/ui/excel/cursorType";

import { enableColumnResizeMode, disableColumnResizeMode } from "@actions/ui/excel/isColumnResizeMode";
import { enableRowResizeMode, disableRowResizeMode } from "@actions/ui/excel/isRowResizeMode";
import { enableFreezeRowResizeMode, disableFreezeRowResizeMode } from "@actions/ui/excel/isFreezeRowResizeMode";
import { enableFreezeColumnResizeMode, disableFreezeColumnResizeMode } from "@actions/ui/excel/isFreezeColumnResizeMode";

import { updateRowResizeData, resetRowResizeData } from "@actions/ui/excel/rowResizeData";
import { updateColumnResizeData, resetColumnResizeData } from "@actions/ui/excel/columnResizeData";
import { updateFreezeRowResizeData, resetFreezeRowResizeData } from "@actions/ui/excel/freezeRowResizeData";
import { updateFreezeColumnResizeData, resetFreezeColumnResizeData } from "@actions/ui/excel/freezeColumnResizeData";

import { enableSelectionMode, disableSelectionMode } from "@actions/ui/excel/isSelectionMode";
import { enableEditMode, disableEditMode } from "@actions/ui/excel/isEditMode";
import { updateScrollData } from "@actions/ui/excel/scrollData";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "@actions/ui/excel/stagnantSelectionAreas";

import { updateSheetCellData } from "@actions/ui/excel/sheetCellData";
import { updateSheetColumnWidths } from "@actions/ui/excel/sheetColumnWidths";
import { updateSheetRowHeights } from "@actions/ui/excel/sheetRowHeights";

import { updateSheetColumnCount } from "@actions/ui/excel/sheetColumnCount";
import { updateSheetRowCount } from "@actions/ui/excel/sheetRowCount";

import { updateSheetHiddenRows } from "@actions/ui/excel/sheetHiddenRows";
import { updateSheetHiddenColumns } from "@actions/ui/excel/sheetHiddenColumns";

import { updateSelectedRows, resetSelectedRows } from "@actions/ui/excel/selectedRows";
import { updateSelectedColumns, resetSelectedColumns } from "@actions/ui/excel/selectedColumns"; 

import { updateSheetNames } from "@actions/ui/excel/sheetNames";

import { updateActiveSheetName } from "@actions/ui/excel/activeSheetName";

import { updateActiveCellDialog, resetActiveCellDialog } from "@actions/ui/excel/activeCellDialog";

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
  generateNewSheetName,
  createBlankSheet,
  getResizeOffset,
  clearEditorStateText,
  isPrepopulateString
} from "@tools/excel";

import {
  isObjectEmpty
} from "@tools/misc";

import {
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER
} from "@constants/excel";


import { 
  REST_ADMIN_BUSINESS_CONCEPTS, 
  REST_ADMIN_TEMPLATES,
  REST_ADMIN_BUNDLES_WORKFLOW
} from "@constants/rest";

const mapStateToProps = ({ 
  domain: {
    account
  },
  ui: { 
    excel
  } 
}) => ({
  ...excel,
  account
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSheetRowCount: (sheetRowCount) => dispatch(updateSheetRowCount(sheetRowCount)),
  handleUpdateSheetColumnCount: (sheetColumnCount) => dispatch(updateSheetColumnCount(sheetColumnCount)),

  handleUpdateSheetHiddenRows: (sheetHiddenRows) => dispatch(updateSheetHiddenRows(sheetHiddenRows)),
  handleUpdateSheetHiddenColumns: (sheetHiddenColumns) => dispatch(updateSheetHiddenColumns(sheetHiddenColumns)),

  handleUpdateActiveCellPosition: (activeCellPosition) => dispatch(updateActiveCellPosition(activeCellPosition)),

  handleUpdateActiveSelectionArea: (activeSelectionArea) => dispatch(updateActiveSelectionArea(activeSelectionArea)),
  handleResetActiveSelectionArea: () => dispatch(resetActiveSelectionArea()),

  handleUpdateActiveCellSelectionAreaIndex: (activeCellSelectionAreaIndex) => dispatch(updateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex)),
  handleResetActiveCellSelectionAreaIndex: () => dispatch(resetActiveCellSelectionAreaIndex()),

  handleUpdateStagnantSelectionAreas: (stagnantSelectionAreas) => dispatch(updateStagnantSelectionAreas(stagnantSelectionAreas)),
  handleResetStagnantSelectionAreas: () => dispatch(resetStagnantSelectionAreas()),

  handleenableSelectionMode: () => dispatch(enableSelectionMode()),
  handledisableSelectionMode: () => dispatch(disableSelectionMode()),

  handleenableEditMode: () => dispatch(enableEditMode()),
  handledisableEditMode: () => dispatch(disableEditMode()),

  handleUpdateScrollData: (scrollData) => dispatch(updateScrollData(scrollData)),

  handleUpdateSheetCellData: (sheetName, sheetsCellData) => dispatch(updateSheetCellData(sheetName, sheetsCellData)),

  handleUpdateActiveCellInputData: (value) => dispatch(updateActiveCellInputData(value)),
  handleResetActiveCellInputData: () => dispatch(resetActiveCellInputData()),

  handleEnableActiveCellInputAutoFocus: () => dispatch(enableActiveCellInputAutoFocus()),
  handleDisableActiveCellInputAutoFocus: () => dispatch(disableActiveCellInputAutoFocus()),

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

  handleenableColumnResizeMode: () => dispatch(enableColumnResizeMode()),
  handledisableColumnResizeMode: () => dispatch(disableColumnResizeMode()),
  
  handleenableRowResizeMode: () => dispatch(enableRowResizeMode()),
  handledisableRowResizeMode: () => dispatch(disableRowResizeMode()),

  handleenableFreezeColumnResizeMode: () => dispatch(enableFreezeColumnResizeMode()),
  handledisableFreezeColumnResizeMode: () => dispatch(disableFreezeColumnResizeMode()),
  
  handleenableFreezeRowResizeMode: () => dispatch(enableFreezeRowResizeMode()),
  handledisableFreezeRowResizeMode: () => dispatch(disableFreezeRowResizeMode()),

  handleUpdateSheetRowHeights: (sheetRowHeights) => dispatch(updateSheetRowHeights(sheetRowHeights)),

  handleUpdateSheetColumnWidths: (sheetColumnWidths) => dispatch(updateSheetColumnWidths(sheetColumnWidths)),

  handleLoadSheet: (workbookData) => loadSheet(dispatch, workbookData),
  handleUpdateSheetNames: (sheetNames) => dispatch(updateSheetNames(sheetNames)),
  handleUpdateActiveSheetName: (activeSheetName) => dispatch(updateActiveSheetName(activeSheetName)),

  handleUpdateSelectedRows: (selectedRows) => dispatch(updateSelectedRows(selectedRows)),
  handleResetSelectedRows: () => dispatch(resetSelectedRows()),
  
  handleUpdateSelectedColumns: (selectedColumns) => dispatch(updateSelectedColumns(selectedColumns)),
  handleResetSelectedColumns: () => dispatch(resetSelectedColumns()),

  handleUpdateActiveCellDialog: (dialogType) => dispatch(updateActiveCellDialog(dialogType)),
  handleResetActiveCellDialog: () => dispatch(resetActiveCellDialog())
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
      this.enableEditMode();

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

      handleUpdateSheetCellData,
      handleUpdateActiveCellInputData
    } = this.props;

    if(isEditMode) return;

    const { x, y } = activeCellPosition;

    if(activeCellSelectionAreaIndex >= 0) {
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
            newSheetCellData[row][column] = {
              ...newSheetCellData[row][column],
              value: undefined,
              type: "normal"
            };
          }
        });
      }

      handleUpdateSheetCellData(newSheetCellData);
    } else {
      
      if(sheetCellData[y] && sheetCellData[y][x]) this.changeValue(y, x, { ...sheetCellData[y][x], value: undefined, type: "normal" });
    }

    handleUpdateActiveCellInputData({ editorState: convertTextToEditorState("") });
  }

  changeActiveInputData(data) {
    const { handleUpdateActiveCellInputData } = this.props;

    handleUpdateActiveCellInputData(data);
  }

  changeValue(row, column, newData) {
    const { 
      sheetCellData, 
      handleUpdateSheetCellData 
    } = this.props;

    // ! need to parse data and determine if it's a formula type
    // Formula type needs to be recalculated if changed

    const { value: newValue } = newData;

    const currentCellData = getCellData(sheetCellData, row, column);

    let newSheetCellData = cloneDeep(sheetCellData);

    // ! Consider other types!
    if(isPrepopulateString(newValue)) {
      newData.type = "prepopulate";
    } else {
      newData.type = "normal";
    }

    // ! Need to consider other parameters other than value!!
    // ! Only update if data changed!
    if(currentCellData) {
      if(currentCellData !== newValue || currentCellData.type !== newData.type) {
        newSheetCellData[row][column] = { ...currentCellData, ...newData };
        handleUpdateSheetCellData(newSheetCellData);
      }
    } else if(!isObjectEmpty(newData)) {
      // ! Change type?
      if(!newSheetCellData[row]) newSheetCellData[row] = {};
      newSheetCellData[row][column] = newData;
      handleUpdateSheetCellData(newSheetCellData);
    }
  }

  // ! TODO : Add parameters here for hyperlinks?
  changeSheet(sheetName) {
    const {
      sheetGridRef,
      name,
      activeCellPosition,
      activeCellInputData,
      activeSheetName,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetFreezeRowCount,
      sheetRowHeights,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas,
      handleLoadSheet
    } = this.props;

    let currentSheetData = {
      name,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetFreezeRowCount,
      sheetRowHeights,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas
    };
    
    let currentInactiveSheets = JSON.parse(sessionStorage.getItem("inactiveSheets"));
    const newActiveSheetData = JSON.parse(pako.inflate(currentInactiveSheets[sheetName], { to: "string" }));

    currentInactiveSheets[activeSheetName] = pako.deflate(JSON.stringify(currentSheetData), { to: "string" });
    currentInactiveSheets[sheetName] = undefined;

    sessionStorage.setItem("inactiveSheets", JSON.stringify(currentInactiveSheets));
    
    // ! Need to updae active cell input data!
    handleLoadSheet({
      ...newActiveSheetData,
      activeSheetName: sheetName,

      // ! Update this for the new sheet!!
      activeCellInputData
    });

    sheetGridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
  }

  focusFormulaInput() {
    this.setInputAutoFocusOff();
    this.enableEditMode();
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

      this.disableEditMode();
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
    this.enableEditMode();
  }

  _offsetObjectAtIndex(data, start, offset) {
    let newData = {};
    let startData = data[start];

    const end = start + offset;

    for(let offsetParam in data) {
      const paramData = data[offsetParam];
      if(offsetParam >= start && paramData) {
        const newOffsetParam = Number(offsetParam) + offset;
        newData[newOffsetParam] = paramData;
      } else {
        newData[offsetParam] = data[offsetParam];
      }
    }

    if(startData !== undefined) {
      for(let i = start; i < end; i++) newData[i] = startData;
    }

    return newData;
  }

  _offsetSheetCellRowDataAtIndex(sheetCellData, start, offset) {
    let newData = {};
    let startData = sheetCellData[start];
    let template = {};

    const end = start + offset;

    for(let column in startData) {
      if(startData[column] && startData[column].styles) template[column] = { type: "normal", styles: startData[column].styles };
    }

    // Offset data downwards
    for(let row in sheetCellData) {
      const rowData = sheetCellData[row];
      if(start <= row && rowData) {
        const newRowOffset = Number(row) + offset;
        newData[newRowOffset] = rowData;
      } else {
        newData[row] = sheetCellData[row];
      }
    }

    if(startData !== undefined) {
        for(let i = start; i < end; i++) newData[i] = template;
    }

    return newData;
  }

  _offsetSheetCellColumnDataAtIndex(sheetCellData, start, offset) {
    // Get the template column data to apply to inserted columns
    let template = {};
    let newData = {};

    const end = start + offset;

    // Offset data rightwards
    for(let row in sheetCellData) {
      const columns = sheetCellData[row];

      if(newData[row] === undefined) newData[row] = {};

      for(let column in columns) {
        const columnData = columns[column];
        if(start <= column && columnData) {
          if(start == column && columnData.styles) template[row] = { styles: columnData.styles };

          const newColumnOffset = Number(column) + offset;
          newData[row][newColumnOffset] = sheetCellData[row][column];
        } else {
          newData[row][column] = sheetCellData[row][column];
        }
      }
    }

    if(!isObjectEmpty(template)) {
      for(let row in newData) {
        for(let i = start; i < end; i++) newData[row][i] = template[row];
      }
    }

    return newData;
  }

  _getInsertData(parameterString, stagnantSelectionAreas, activeCellPosition) {
    let insertStart;
    let insertCount;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(stagnantSelectionAreasLength) {
      const { [`${parameterString}1`]: pos1, [`${parameterString}2`]: pos2 } = stagnantSelectionAreas[stagnantSelectionAreasLength - 1];

      insertStart = Math.min(pos1, pos2);
      insertCount = Math.abs(pos2 - pos1) + 1;
    } else {
      const { [parameterString]: pos } = activeCellPosition;

      insertStart = pos;
      insertCount = 1;
    }

    return { insertStart, insertCount };
  }

  insertRow() {
    const {
      sheetGridRef,
      activeCellPosition,
      sheetCellData,
      sheetRowHeights,
      sheetHiddenRows,
      sheetRowCount,
      stagnantSelectionAreas,
      handleUpdateSheetCellData,
      handleUpdateSheetRowHeights,
      handleUpdateSheetRowCount,
      handleUpdateSheetHiddenRows
    } = this.props;
    const { insertCount, insertStart } = this._getInsertData("y", stagnantSelectionAreas, activeCellPosition);

    const newRowCount = sheetRowCount + insertCount;

    const newSheetCellData = this._offsetSheetCellRowDataAtIndex(sheetCellData, insertStart, insertCount);
    const newRowHeights = this._offsetObjectAtIndex(sheetRowHeights, insertStart, insertCount);
    const newHiddenRows = this._offsetObjectAtIndex(sheetHiddenRows, insertStart, insertCount);

    sheetGridRef.current.resetAfterRowIndex(insertStart);
    handleUpdateSheetRowCount(newRowCount);
    handleUpdateSheetCellData(newSheetCellData);
    handleUpdateSheetRowHeights(newRowHeights);
    handleUpdateSheetHiddenRows(newHiddenRows);
  }
  
  insertColumn() {
    const {
      sheetGridRef,
      activeCellPosition,
      sheetCellData,
      sheetColumnWidths,
      sheetHiddenColumns,
      sheetColumnCount,
      stagnantSelectionAreas,
      handleUpdateSheetCellData,
      handleUpdateSheetColumnWidths,
      handleUpdateSheetColumnCount,
      handleUpdateSheetHiddenColumns
    } = this.props;

    const { insertCount, insertStart } = this._getInsertData("x", stagnantSelectionAreas, activeCellPosition);

    const newColumnCount = sheetColumnCount + insertCount;

    const newSheetCellData = this._offsetSheetCellColumnDataAtIndex(sheetCellData, insertStart, insertCount);
    const newColumnWidths = this._offsetObjectAtIndex(sheetColumnWidths, insertStart, insertCount);
    const newHiddenColumns = this._offsetObjectAtIndex(sheetHiddenColumns, insertStart, insertCount);

    sheetGridRef.current.resetAfterColumnIndex(insertStart);
    handleUpdateSheetColumnCount(newColumnCount);
    handleUpdateSheetCellData(newSheetCellData);
    handleUpdateSheetColumnWidths(newColumnWidths);
    handleUpdateSheetHiddenColumns(newHiddenColumns);
  }

  rightClickCell(event, row, column) {
    const {
      stagnantSelectionAreas,
      handleResetStagnantSelectionAreas
    } = this.props;

    event.preventDefault();
    this.disableEditMode();
    
    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(stagnantSelectionAreasLength) {
      const { x1, x2, y1, y2 } = stagnantSelectionAreas[stagnantSelectionAreasLength - 1];

      if(((x1 <= column && column <= x2) || (x2 <= column && column <= x1)) && ((y1 <= row && row <= y2) || (y2 <= row && row <= y1))) return;
    } 

    handleResetStagnantSelectionAreas();
    this.updateActiveCellPosition(row, column);
  }

  doubleClickEditableCell() {
    const {
      isSelectionMode
    } = this.props;

    if(isSelectionMode) return;

    this.enableEditMode();
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
      
      this.disableEditMode();

      const cellData = sheetCellData[y] && sheetCellData[y][x] ? sheetCellData[y][x] : undefined;

      const type = cellData ? cellData.type : undefined;
      const value = cellData ? cellData.value : undefined;
      
      handleUpdateActiveCellInputData({ editorState: type === "rich-text" ? convertRichTextToEditorState(value) : convertTextToEditorState(value) });

      SheetContainerInstance.focus();
    }
  }

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
      handledisableRowResizeMode,
      handleResetRowResizeData,
      handledisableColumnResizeMode,
      handleUpdateSheetRowHeights,
      handleUpdateSheetColumnWidths,
      handleUpdateActiveCellPosition
    } = this.props;

    if(isSelectionMode) {
      this.disableSelectionMode();
  
      if(activeSelectionArea) {
        const { x1, y1, x2, y2 } = activeSelectionArea;
    
        if((x1 !== x2 || y1 !== y2) || ctrlKey) {
          const minX = Math.min(x1, x2);
          const maxX = Math.max(x1, x2);

          const minY = Math.min(y1, y2);
          const maxY = Math.max(y1, y2);

          // Cut the first superset stagnant selection area
          const supersetIndex = stagnantSelectionAreas.findIndex(({ x1: sX1, x2: sX2, y1: sY1, y2: sY2 }) => {
            const minSX = Math.min(sX1, sX2);
            const maxSX = Math.max(sX1, sX2);

            const minSY = Math.min(sY1, sY2);
            const maxSY = Math.max(sY1, sY2);

            const isXContained = minSX <= minX && maxX <= maxSX;
            const isYContained = minSY <= minY && maxY <= maxSY;

            return isXContained && isYContained; 
          });

          let newStagnantSelectionAreas;

          if(supersetIndex >= 0) {
            const { x1: sX1, x2: sX2, y1: sY1, y2: sY2 } = stagnantSelectionAreas[supersetIndex];
            const minSX = Math.min(sX1, sX2);
            const midLeftSX = minX;
            const midRightSX = maxX;
            const maxSX = Math.max(sX1, sX2);

            const minSY = Math.min(sY1, sY2);
            const midTopSY = minY;
            const midBottomSY = maxY;
            const maxSY = Math.max(sY1, sY2);

            let newAreas = [];

            if(minSY !== midTopSY) newAreas.push({ x1: minSX, x2: maxSX, y1: minSY, y2: midTopSY - 1 });
            if(minSX !== midLeftSX) newAreas.push({ x1: minSX, x2: midLeftSX - 1, y1: midTopSY, y2: midBottomSY });
            if(maxSX !== midRightSX) newAreas.push({ x1: midRightSX + 1, x2: maxSX, y1: midTopSY, y2: midBottomSY });
            if(maxSY !== midBottomSY) newAreas.push({ x1: minSX, x2: maxSX, y1: midBottomSY + 1, y2: maxSY });

            newStagnantSelectionAreas = [ 
              ...stagnantSelectionAreas.slice(0, supersetIndex), 
              ...newAreas, 
              ...stagnantSelectionAreas.slice(supersetIndex + 1) 
            ];

            const isNewAreasPresent = newAreas.length;
            const isNewStagnantAreasPresent = newStagnantSelectionAreas.length;

            if(isNewAreasPresent || isNewStagnantAreasPresent) {
              let focusedArea;
              let activeCellSelectionareaIndex;

              if(isNewAreasPresent) {
                activeCellSelectionareaIndex = supersetIndex;
                focusedArea = newAreas;
              } else {
                activeCellSelectionareaIndex = 0;
                focusedArea = newStagnantSelectionAreas;
              }

              const { x1, x2, y1, y2 } = focusedArea[0];

              const newX = Math.min(x1, x2);
              const newY = Math.min(y1, y2);

              handleUpdateActiveCellPosition({ x: newX, y: newY });
              handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionareaIndex);
            }
          } else {
            newStagnantSelectionAreas = [ ...stagnantSelectionAreas, activeSelectionArea ];
            handleUpdateActiveCellSelectionAreaIndex(newStagnantSelectionAreas.length - 1);
          }

          handleUpdateStagnantSelectionAreas(newStagnantSelectionAreas);
          
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
        
        handledisableRowResizeMode();
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

        handledisableColumnResizeMode();
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

    this.enableSelectionMode();

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

  enableSelectionMode() {
    const { isSelectionMode, handleenableSelectionMode } = this.props;

    if(!isSelectionMode) handleenableSelectionMode();
  }

  disableSelectionMode() {
    const { isSelectionMode, handledisableSelectionMode } = this.props;

    if(isSelectionMode) handledisableSelectionMode();
  }

  enableEditMode() {
    const { 
      isEditMode, 
      isSelectionMode, 
      isCommentDialogOpen,
      activeCellPosition,
      sheetCellData,
      handleenableEditMode, 
      handledisableSelectionMode 
    } = this.props;

    const { x, y } = activeCellPosition;

    if(sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].isReadOnly || isCommentDialogOpen) return;

    if(!isEditMode) handleenableEditMode();

    if(isSelectionMode) handledisableSelectionMode();
  }

  disableEditMode() {
    const { isEditMode, handledisableEditMode } = this.props;

    if(isEditMode) handledisableEditMode();
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
    
    const cellData = sheetCellData[newY] && sheetCellData[newY][newX] ? sheetCellData[newY][newX] : {};

    const { type, value, formula } = cellData;

    handleUpdateActiveCellInputData({ 
      editorState: type === "rich-text" 
        ? convertRichTextToEditorState(value) 
        : convertTextToEditorState(formula ? `=${formula}` : value) 
      });

    handleUpdateActiveCellPosition({ x: newX, y: newY });

    if(shouldScroll) this._scrollTo(newY, newX);
  }

  _getLastArea(stagnantSelectionAreas, activeCellPosition) {
    let area;
    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;
    if(stagnantSelectionAreasLength) {
      area  = stagnantSelectionAreas[ stagnantSelectionAreasLength - 1 ];
    } else {
      const { y, x } = activeCellPosition;
      area = { y1: y, y2: y, x1: x, x2: x };
    }

    return area;
  }

  deleteCellsShiftUp() {
    const { 
      stagnantSelectionAreas,
      activeCellPosition,
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;
    let newSheetCellData = {};

    const { y1, y2, x1, x2 } = this._getLastArea(stagnantSelectionAreas, activeCellPosition);

    const shiftOffsetY = Math.abs(y1 - y2);
    const shiftStartY = Math.min(y1, y2);
    const shiftEndY = shiftStartY + shiftOffsetY + 1;

    const columnStart = Math.min(x1, x2);
    const columnEnd = Math.max(x1, x2);

    for(let row in sheetCellData) {
      const columns = sheetCellData[row];

      if(row < shiftStartY) {
        newSheetCellData[row] = columns;
      } else {
        for(let column in columns) {
          if(row >= shiftEndY && column >= columnStart && column <= columnEnd) {
            const newRowOffset = row - shiftOffsetY - 1;
            if(!newSheetCellData[newRowOffset]) newSheetCellData[newRowOffset] = {};
            newSheetCellData[newRowOffset][column] = sheetCellData[row][column];
          } else if(column < columnStart || column > columnEnd) {
            if(!newSheetCellData[row]) newSheetCellData[row] = {};
            newSheetCellData[row][column] = sheetCellData[row][column];
          }
        }
      } 
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  deleteCellsShiftLeft() {
    const { 
      stagnantSelectionAreas,
      activeCellPosition,
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;

    let newSheetCellData = {};
    const { y1, y2, x1, x2 } = this._getLastArea(stagnantSelectionAreas, activeCellPosition);

    const shiftOffsetX = Math.abs(x1 - x2);
    const shiftStartX = Math.min(x1, x2);
    const shiftEndX = shiftStartX + shiftOffsetX + 1;

    const rowStart = Math.min(y1, y2);
    const rowEnd = Math.max(y1, y2);

    for(let row in sheetCellData) {
      const columns = sheetCellData[row];
      if(row < rowStart || row > rowEnd) {
        newSheetCellData[row] = columns;
      } else {
        for(let column in columns) {
          if(column < shiftStartX) {
            if(!newSheetCellData[row]) newSheetCellData[row] = {};
            newSheetCellData[row][column] = sheetCellData[row][column];
          } else if(column >= shiftEndX) {
            if(!newSheetCellData[row]) newSheetCellData[row] = {};
            const newColumnOffset = column - shiftOffsetX - 1;
            newSheetCellData[row][newColumnOffset] = sheetCellData[row][column];
          }
        }
      }
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  // ! Too much calculation? Performance is choppy
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
    const { activeCellInputAutoFocus, handleEnableActiveCellInputAutoFocus } = this.props;
    if(!activeCellInputAutoFocus) handleEnableActiveCellInputAutoFocus();
  }

  setInputAutoFocusOff() {
    const { activeCellInputAutoFocus, handleDisableActiveCellInputAutoFocus } = this.props;
    if(activeCellInputAutoFocus) handleDisableActiveCellInputAutoFocus();
  }

  startColumnDrag(column) {
    const { 
      leftOffsets,
      sheetColumnWidths, 
      handleUpdateColumnResizeData,
      handleenableColumnResizeMode,
      handleUpdateCursorType
    } = this.props;
    const width = getNormalColumnWidth(sheetColumnWidths[column]);
    const columnOffset = leftOffsets[column];
    const offset = columnOffset + width;

    handleenableColumnResizeMode();
    handleUpdateColumnResizeData({ column, offset });
    handleUpdateCursorType("ew-resize");
  }

  startRowDrag(row) {
    const { 
      topOffsets,
      sheetRowHeights, 
      handleUpdateRowResizeData, 
      handleenableRowResizeMode,
      handleUpdateCursorType 
    } = this.props;
    const height = getNormalRowHeight(sheetRowHeights[row]);
    const rowOffset = topOffsets[row];
    const offset = rowOffset + height;

    handleenableRowResizeMode();
    handleUpdateRowResizeData({ row, offset });
    handleUpdateCursorType("ns-resize");
  }

  saveTemplate(commonProps) {
    const {
      isTemplatePublished,
      templateId
    } = this.props;

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

  saveBundle(bundleAxiosRouter, commonProps) {
    const {
      bundleId,
      templateId
    } = this.props;

    const fileStates = extractReactAndWorkbookState(commonProps);

    bundleAxiosRouter.put(
      `${REST_ADMIN_BUNDLES_WORKFLOW}/${bundleId}/workbook/${templateId}`,
      { workbook: fileStates }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  saveEditBundle(commonProps) {
    this.saveBundle(adminEditBundleRoleAxios, commonProps);
  }

  saveReviewBundle(commonProps) {
    this.saveBundle(adminReviewBundleRoleAxios, commonProps);
  }

  saveApproveBundle(commonProps) {
    this.saveBundle(adminApproveBundleRoleAxios, commonProps);
  }

  saveManagerBundle(commonProps) {
    this.saveBundle(adminBundleRoleAxios, commonProps);
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
      sheetHiddenRows,
      stagnantSelectionAreas
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
      stagnantSelectionAreas
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

  changeSheetName(sheetName, newSheetName) {
    const {
      activeSheetName,
      sheetNames,
      handleUpdateSheetNames,
      handleUpdateActiveSheetName
    } = this.props;
    if(activeSheetName === newSheetName) return console.error(`Sheet name with name ${newSheetName} already exists`);

    const newSheetNames = sheetNames.map((name) => name === sheetName ? newSheetName : name);

    handleUpdateActiveSheetName(newSheetName);

    handleUpdateSheetNames(newSheetNames);
  }

  addSheet() {
    const {
      activeSheetName,
      sheetNames,
      handleUpdateSheetNames
    } = this.props;
    
    const newSheetName = generateNewSheetName(sheetNames);
    const newSheetData = createBlankSheet();

    let currentInactiveSheets = JSON.parse(sessionStorage.getItem("inactiveSheets"));

    currentInactiveSheets[newSheetName] = pako.deflate(JSON.stringify(newSheetData), { to: "string" });;

    sessionStorage.setItem("inactiveSheets", JSON.stringify(currentInactiveSheets));

    const activeSheetNameIndex = sheetNames.indexOf(activeSheetName);

    handleUpdateSheetNames([ ...sheetNames.slice(0, activeSheetNameIndex + 1), newSheetName, ...sheetNames.slice(activeSheetNameIndex + 1) ]);

    this.changeSheet(newSheetName);
  }

  // TODO
  setReadOnly() {
    const {
      sheetCellData,
      stagnantSelectionAreas,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(stagnantSelectionAreasLength) {
      let areaPositionSet = {};
      
      stagnantSelectionAreas.forEach(({ x1, x2, y1, y2 }) => {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        for(let row = minY; row <= maxY; row++) {
          if(!areaPositionSet[row]) areaPositionSet[row] = {};

          for(let column = minX; column <= maxX; column++) areaPositionSet[row][column] = true;
        }
      });
    
      for(let row in areaPositionSet) {
        const columns = areaPositionSet[row];
        
        if(!newSheetCellData[row]) newSheetCellData[row] = {};

        for(let column in columns) newSheetCellData[row][column] = { ...newSheetCellData[row][column], isReadOnly: true }; 
      }
    } else {
      const { x, y } = activeCellPosition;

      if(!newSheetCellData[y]) newSheetCellData[y] = {};
      
      newSheetCellData[y][x] = { ...newSheetCellData[y][x], isReadOnly: true }; 
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  unsetReadOnly() {
    const {
      sheetCellData,
      stagnantSelectionAreas,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(stagnantSelectionAreasLength) {
      let areaPositionSet = {};
      
      stagnantSelectionAreas.forEach(({ x1, x2, y1, y2 }) => {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        for(let row = minY; row <= maxY; row++) {
          if(!areaPositionSet[row]) areaPositionSet[row] = {};

          for(let column = minX; column <= maxX; column++) areaPositionSet[row][column] = true;
        }
      });
    
      for(let row in areaPositionSet) {
        const columns = areaPositionSet[row];
        
        if(!newSheetCellData[row]) continue;

        for(let column in columns) {
          if(newSheetCellData[row][column]) {
            delete newSheetCellData[row][column].isReadOnly;
  
            if(isObjectEmpty(newSheetCellData[row][column])) {
              delete newSheetCellData[row][column];
  
              if(isObjectEmpty(newSheetCellData[row])) delete newSheetCellData[row];
            }
          }
        }
      }
    } else {
      const { x, y } = activeCellPosition;

      if(newSheetCellData[y]) {
        if(newSheetCellData[y][x]) {
          delete newSheetCellData[y][x].isReadOnly;

          if(isObjectEmpty(newSheetCellData[y][x])) {
            delete newSheetCellData[y][x];

            if(isObjectEmpty(newSheetCellData[y])) delete newSheetCellData[y];
          }
        }
      }
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  addComment(comment) {
    const {
      sheetCellData,
      activeCellPosition,
      account: {
        _id: accountId,
        firstName,
        lastName
      },
      handleUpdateSheetCellData
    } = this.props;

    const newSheetCellData = cloneDeep(sheetCellData);

    const { x, y } = activeCellPosition;

    if(!newSheetCellData[y]) newSheetCellData[y] = {};

    if(!newSheetCellData[y][x]) newSheetCellData[y][x] = {};

    if(!newSheetCellData[y][x].comments) newSheetCellData[y][x].comments = [];

    const commentData = {
      id: uniqid(),
      by: `${firstName} ${lastName}`,
      accountId,
      comment
    };
    
    newSheetCellData[y][x].comments.push(commentData);
    
    handleUpdateSheetCellData(newSheetCellData);
  }

  // ! Do not check for edge cases for now - no time (deleting comments of other users...)
  deleteComment(commentId, _accountId) {
    const {
      sheetCellData,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const newSheetCellData = cloneDeep(sheetCellData);

    const { x, y } = activeCellPosition;

    if(newSheetCellData[y] && newSheetCellData[y][x]) {
      let { comments } = newSheetCellData[y][x];

      if(comments) {
        const commentIndex = comments.findIndex(({ id }) => id === commentId);

        if(commentIndex >= 0) {
          newSheetCellData[y][x].comments = [ ...comments.slice(0, commentIndex), ...comments.slice(commentIndex + 1) ];
          // ! Need to make a function for this... tedious 
          if(!newSheetCellData[y][x].comments.length) delete newSheetCellData[y][x].comments;
          if(isObjectEmpty(newSheetCellData[y][x])) delete newSheetCellData[y][x];
          if(isObjectEmpty(newSheetCellData[y])) delete newSheetCellData[y];
          return handleUpdateSheetCellData(newSheetCellData);
        }
      } 
    }

    console.error("Comment not found");
  }

  updateActiveCellDialog(type) {
    const {
      activeCellDialog,
      handleUpdateActiveCellDialog
    } = this.props;

    if(activeCellDialog !== type) handleUpdateActiveCellDialog(type);
  }

  resetActiveCellDialog() {
    const {
      activeCellDialog,
      handleResetActiveCellDialog
    } = this.props;

    if(activeCellDialog) handleResetActiveCellDialog(null);
  }

  changeBusinessConcept(type, concept) {
    const {
      activeCellPosition,
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;
    const { x, y } = activeCellPosition;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(type === "attribute") {
      if(!newSheetCellData[1]) newSheetCellData[1] = {};

      newSheetCellData[1][x] = { value: concept, type: "normal" };
    } else {
      if(!newSheetCellData[y]) newSheetCellData[y] = {};

      // ! Should we remove everything?
      newSheetCellData[y][1] = { ...newSheetCellData[y][1], value: concept, type: "normal" };
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  setPrepopulate({ type, quarter, year }) {
    const {
      activeCellPosition,
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;

    let prepopulateArray = [];

    if(type) prepopulateArray.push(`type=${type}`);
    if(quarter) prepopulateArray.push(`quarter=${quarter}`);
    if(year) prepopulateArray.push(`year=${year}`);

    if(prepopulateArray.length) {
      const prepopulateString = `|${prepopulateArray.join("&")}`;

      const { x, y } = activeCellPosition;

      let newSheetCellData = cloneDeep(sheetCellData);

      if(!newSheetCellData[y]) newSheetCellData[y] = {};

      newSheetCellData[y][x] = { ...newSheetCellData[x], value: prepopulateString, type: "prepopulate" };

      handleUpdateSheetCellData(newSheetCellData);
      this.resetActiveCellDialog();
    } else {
      console.error("No prepopulate parameters specified");
    }
  }

  render() {
    return null;
  }
};
