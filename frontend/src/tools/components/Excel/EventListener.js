import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { setActiveCellInputAutoFocusOn, setActiveCellInputAutoFocusOff } from "actions/ui/excel/activeCellInputAutoFocus";
import { updateActiveCellInputValue, resetActiveCellInputValue } from "actions/ui/excel/activeCellInputValue";
import { updateActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellSelectionAreaIndex, resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";
import { updateScrollData } from "actions/ui/excel/scrollData";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { updateSheetCellData } from "actions/ui/excel/sheetsCellData";

import { isPositionEqualArea, getScrollbarSize, getEstimatedTotalHeight, getEstimatedTotalWidth } from "tools/excel";

const mapStateToProps = ({ 
  ui: { 
    excel: { 
      activeCellInputValue,
      activeCellPosition,
      activeSelectionArea, 
      activeCellSelectionAreaIndex,
      activeCellInputAutoFocus,

      activeSheetName,

      stagnantSelectionAreas,

      scrollData,
      
      isSelectionMode, 
      isEditMode,

      sheetsColumnCount,
      sheetsRowCount,
      sheetsCellData,
      sheetsCellOffsets,
      sheetsFreezeColumnCount,
      sheetsFreezeRowCount
    } 
  } 
}) => ({ 
  activeCellInputValue,
  activeCellPosition,
  activeSelectionArea, 
  activeCellSelectionAreaIndex,
  activeCellInputAutoFocus,

  activeSheetName,

  stagnantSelectionAreas,

  scrollData,
  
  isSelectionMode, 
  isEditMode,

  // Active sheet
  sheetCellData: sheetsCellData[activeSheetName],
  sheetRowCount: sheetsRowCount[activeSheetName],
  sheetColumnCount: sheetsColumnCount[activeSheetName],
  sheetCellOffsets: sheetsCellOffsets[activeSheetName],
  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName]
});

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

  handleUpdateActiveCellInputValue: (value) => dispatch(updateActiveCellInputValue(value)),
  handleResetActiveCellInputValue: () => dispatch(resetActiveCellInputValue()),

  handleSetActiveCellInputAutoFocusOn: () => dispatch(setActiveCellInputAutoFocusOn()),
  handleSetActiveCellInputAutoFocusOff: () => dispatch(setActiveCellInputAutoFocusOff()),
});

let EventListener = ({ 
  eventListenerRef, 
  sheetGridRef,
  
  activeCellInputValue,
  activeSheetName,
  activeCellPosition,
  activeSelectionArea,
  activeCellSelectionAreaIndex,
  activeCellInputAutoFocus,

  sheetRowCount,
  sheetColumnCount,
  sheetCellData,
  sheetCellOffsets,
  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  isSelectionMode,
  isEditMode,
  
  scrollData,

  stagnantSelectionAreas,

  handleUpdateActiveCellPosition,

  handleUpdateActiveCellSelectionAreaIndex,
  handleResetActiveCellSelectionAreaIndex,

  handleUpdateActiveSelectionArea,
  handleResetActiveSelectionArea,

  handleUpdateStagnantSelectionAreas,
  handleResetStagnantSelectionAreas,

  handleSetSelectionModeOn,
  handleSetSelectionModeOff,

  handleSetEditModeOn,
  handleSetEditModeOff,

  handleUpdateScrollData,

  handleChangeSheetCellData,

  handleUpdateActiveCellInputValue,
  handleResetActiveCellInputValue,

  handleSetActiveCellInputAutoFocusOn,
  handleSetActiveCellInputAutoFocusOff
}) => (
  <EventRedux 
    ref={eventListenerRef} 
    sheetGridRef={sheetGridRef}

    sheetRowCount={sheetRowCount}
    sheetColumnCount={sheetColumnCount}
    sheetCellData={sheetCellData}
    sheetCellOffsets={sheetCellOffsets}
    sheetFreezeColumnCount={sheetFreezeColumnCount}
    sheetFreezeRowCount={sheetFreezeRowCount}
    
    activeCellInputValue={activeCellInputValue}
    activeSheetName={activeSheetName}
    activeCellPosition={activeCellPosition}
    activeSelectionArea={activeSelectionArea}
    activeCellSelectionAreaIndex={activeCellSelectionAreaIndex}
    activeCellInputAutoFocus={activeCellInputAutoFocus}

    stagnantSelectionAreas={stagnantSelectionAreas}
    
    scrollData={scrollData}

    isSelectionMode={isSelectionMode}
    isEditMode={isEditMode}

    handleUpdateActiveCellSelectionAreaIndex={handleUpdateActiveCellSelectionAreaIndex}
    handleResetActiveCellSelectionAreaIndex={handleResetActiveCellSelectionAreaIndex} 

    handleUpdateStagnantSelectionAreas={handleUpdateStagnantSelectionAreas}
    handleResetStagnantSelectionAreas={handleResetStagnantSelectionAreas}

    handleUpdateActiveCellPosition={handleUpdateActiveCellPosition}

    handleUpdateActiveSelectionArea={handleUpdateActiveSelectionArea}
    handleResetActiveSelectionArea={handleResetActiveSelectionArea}

    handleSetSelectionModeOn={handleSetSelectionModeOn}
    handleSetSelectionModeOff={handleSetSelectionModeOff}

    handleSetEditModeOn={handleSetEditModeOn}
    handleSetEditModeOff={handleSetEditModeOff}

    handleChangeSheetCellData={handleChangeSheetCellData}

    handleUpdateScrollData={handleUpdateScrollData}

    handleUpdateActiveCellInputValue={handleUpdateActiveCellInputValue}
    handleResetActiveCellInputValue={handleResetActiveCellInputValue}

    handleSetActiveCellInputAutoFocusOn={handleSetActiveCellInputAutoFocusOn}
    handleSetActiveCellInputAutoFocusOff={handleSetActiveCellInputAutoFocusOff}
  />
);

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
      this.saveActiveCellInputValue();

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
      this.saveActiveCellInputValue();

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
      activeSheetName,

      isEditMode,
      activeCellSelectionAreaIndex,
      activeSelectionArea,
      activeCellPosition,
      stagnantSelectionAreas,

      sheetRowCount,
      sheetColumnCount,
      sheetCellData,

      handleChangeSheetCellData
    } = this.props;

    if(isEditMode) return;

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

      let newSheetCellData = [];

      for(let row = 0; row < sheetRowCount; row++) {
        let rowData = [];
        for(let column = 0; column < sheetColumnCount; column++) {
          const cellData = sheetCellData[row][column];

          const coveredRow = selectionAreaCoveredCells[row];

          rowData.push(
            (coveredRow && coveredRow[column]) 
              ? { ...cellData, value: "" }
              : cellData
          );
        }

        newSheetCellData.push(rowData);
      }

      handleChangeSheetCellData(activeSheetName, newSheetCellData);
    } else {
      const { x, y } = activeCellPosition;

      const cellData = sheetCellData[y][x];

      this.changeValue(y, x, { ...cellData, value: "" });
    }
  }

  changeActiveInputValue(value) {
    const { handleUpdateActiveCellInputValue } = this.props;

    handleUpdateActiveCellInputValue(value ? value : "");
  }

  changeValue(row, column, newData) {
    const { 
      activeSheetName, 
      sheetCellData, 
      handleChangeSheetCellData 
    } = this.props;

    
    const { value: newValue } = newData;
    const { value: currentValue } = sheetCellData[row][column];

    if(currentValue !== newValue) {
      const newSheetCellData = [
        ...sheetCellData.slice(0, row),
        [ ...sheetCellData[row].slice(0, column), { ...sheetCellData[row][column], ...newData }, ...sheetCellData[row].slice(column + 1) ],
        ...sheetCellData.slice(row + 1),
      ];
  
      handleChangeSheetCellData(activeSheetName, newSheetCellData);
    } 
  }

  focusFormulaInput() {
    this.setEditModeOn();

    this.setInputAutoFocusOff();
  }

  blurFormulaInput() {
    this.setInputAutoFocusOn();
  }

  clickRowHeader(row, ctrlKey) {
    const {
      sheetColumnCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
    } = this.props;
    
    this.saveActiveCellInputValue();

    this.updateActiveCellPosition(row, 1);

    const rowArea = { x1: 1, y1: row, x2: sheetColumnCount - 1, y2: row };

    if(ctrlKey) {
      handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex + 1);
      handleUpdateStagnantSelectionAreas([ ...stagnantSelectionAreas, rowArea ]);
    } else {
      handleUpdateActiveCellSelectionAreaIndex(0);
      handleUpdateStagnantSelectionAreas([ rowArea ]);
    }
  }

  clickColumnHeader(column, ctrlKey) {
    const {
      sheetRowCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
    } = this.props;

    this.saveActiveCellInputValue();

    this.updateActiveCellPosition(1, column);

    const columnArea = { x1: column, y1: 1, x2: column, y2: sheetRowCount - 1 };

    if(ctrlKey) {
      handleUpdateActiveCellSelectionAreaIndex(activeCellSelectionAreaIndex + 1);
      handleUpdateStagnantSelectionAreas([ ...stagnantSelectionAreas, columnArea ]);
    } else {
      handleUpdateActiveCellSelectionAreaIndex(0);
      handleUpdateStagnantSelectionAreas([ columnArea ]);
    }
  }

  saveActiveCellInputValue() {
    const { isEditMode, activeCellInputValue, activeCellPosition } = this.props;

    if(isEditMode) {
      const { x, y } = activeCellPosition;

      this.changeValue(y, x, { value: activeCellInputValue ? activeCellInputValue : "" });

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

    this.saveActiveCellInputValue();

    this.updateActiveCellPosition(1, 1);

    handleUpdateActiveCellSelectionAreaIndex(0);
    handleUpdateStagnantSelectionAreas([ { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 } ]);
  }

  startEditMode() {
    const { isEditMode } = this.props;

    if(isEditMode) return;

    this.resetActiveCellInputValue();
    this.setEditModeOn();
  }

  doubleClickEditableCell() {
    const { 
      activeCellPosition, 
      sheetCellData,
      handleUpdateActiveCellInputValue 
    } = this.props;

    const { x, y } = activeCellPosition;

    const cellData = sheetCellData[y][x];

    const { value } = cellData;

    if(value) handleUpdateActiveCellInputValue(value);

    this.setEditModeOn();
  }

  escape(sheetContainerRef) {
    const { isEditMode } = this.props;

    if(isEditMode) {
      const { current: SheetContainerInstance } = sheetContainerRef;

      this.setEditModeOff();
      this.resetActiveCellInputValue();
      SheetContainerInstance.focus();
    }
  }

  // ! TODO - Break squares, and deselect stagnant areas with the same area as the active selection
  mouseUp(ctrlKey) {
    const { 
      isSelectionMode, 
      activeSelectionArea, 
      stagnantSelectionAreas, 
      handleResetActiveSelectionArea, 
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex, 
      handleResetActiveCellSelectionAreaIndex 
    } = this.props;

    if(!isSelectionMode) return;

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

    this.saveActiveCellInputValue();

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
        
        if(!stagnantSelectionAreasLength && x1 !== x && y1 !== y) handleUpdateStagnantSelectionAreas([ { x1: x, y1: y, x2: x, y2: y } ]);
      } 

      handleUpdateActiveSelectionArea({ x1, y1, x2, y2 });
      handleUpdateActiveCellSelectionAreaIndex(newActiveCellSelectionAreaIndex);
    }

    this.updateActiveCellPosition(y1, x1);
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
  };

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

  resetActiveCellInputValue() {
    const { activeCellInputValue, handleResetActiveCellInputValue } = this.props;

    if(activeCellInputValue) handleResetActiveCellInputValue();
  }

  updateActiveCellPosition(newY, newX) {
    const { 
      activeCellInputValue,

      sheetCellData, 

      handleUpdateActiveCellPosition, 
      handleUpdateActiveCellInputValue 
    } = this.props;
    const cellData = sheetCellData[newY][newX];

    const { value } = cellData;

    if(activeCellInputValue !== value) handleUpdateActiveCellInputValue(value ? value : "");

    handleUpdateActiveCellPosition({ x: newX, y: newY });

    this._scrollTo(newY, newX);
  }

  _scrollTo(newY, newX) {
    const {
      sheetGridRef,
      sheetColumnCount,
      sheetRowCount,
      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      sheetCellOffsets,
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

    const { top: topFreezeStart, left: leftFreezeStart, height: heightFreezeStart, width: widthFreezeStart } = sheetCellOffsets[sheetFreezeRowCount][sheetFreezeColumnCount];

    const { top: topActiveStart, left: leftActiveStart, height: heightActiveStart, width: widthActiveStart } = sheetCellOffsets[newY][newX];

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
    
    if(newX > sheetFreezeColumnCount &&  leftActiveStart < scrollLeft + freezeWidth) {
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

  render() {
    return null;
  }
};