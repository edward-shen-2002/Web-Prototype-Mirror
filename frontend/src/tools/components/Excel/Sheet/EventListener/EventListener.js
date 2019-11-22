import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellSelectionAreaIndex, resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { isPositionEqualArea } from "tools/excel";

const mapStateToProps = ({ 
  ui: { 
    excel: { 
      activeCellPosition,
      activeSelectionArea, 
      activeCellSelectionAreaIndex,

      stagnantSelectionAreas,
      
      isSelectionMode, 
      isEditMode,

      columnCount,
      rowCount
    } 
  } 
}) => ({ 
  activeCellPosition,
  activeSelectionArea, 
  activeCellSelectionAreaIndex,

  stagnantSelectionAreas,
  
  isSelectionMode, 
  isEditMode,

  columnCount,
  rowCount
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
  handleSetEditModeOff: () => dispatch(setEditModeOff())
});

let EventListener = ({ 
  eventListenerRef, 

  activeCellPosition,
  activeSelectionArea,
  activeCellSelectionAreaIndex,

  columnCount,
  rowCount,

  isSelectionMode,
  isEditMode,

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
  handleSetEditModeOff
}) => (
  <EventRedux 
    ref={eventListenerRef} 

    rowCount={rowCount}
    columnCount={columnCount}

    activeCellPosition={activeCellPosition}
    activeSelectionArea={activeSelectionArea}
    activeCellSelectionAreaIndex={activeCellSelectionAreaIndex}

    stagnantSelectionAreas={stagnantSelectionAreas}

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
      isEditMode,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleResetStagnantSelectionAreas
    } = this.props;
    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let lastStagnantSelectionArea = { ...stagnantSelectionAreas[stagnantSelectionAreasLength - 1] };

        const { y1, y2 } = lastStagnantSelectionArea;

        if(y1 > y || y2 > y) {
          if(y1 > y) {
            lastStagnantSelectionArea.y1 -= 1;
          } else {
            lastStagnantSelectionArea.y2 -= 1;
          }
          
          if(isPositionEqualArea(activeCellPosition, lastStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
          } else {
            handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
          }
        } else {
          if(y1 < y) {
            lastStagnantSelectionArea.y1 -= 1;
          } else {
            lastStagnantSelectionArea.y2 -= 1;
          }

          if(lastStagnantSelectionArea.y1 > 0 && lastStagnantSelectionArea.y2 > 0) handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
        }
      } else {
        const y2 = y - 1;

        if(y2 > 0) handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
      }
    } else {
      y--;
  
      if(y > 0) handleUpdateActiveCellPosition({ y });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas()
    }
  }

  arrowDown(event, shiftKey) {
    let { 
      activeCellPosition,
      isEditMode,
      rowCount,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleResetStagnantSelectionAreas
    } = this.props;
    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let lastStagnantSelectionArea = { ...stagnantSelectionAreas[stagnantSelectionAreasLength - 1] };

        const { y1, y2 } = lastStagnantSelectionArea;

        if(y1 < y || y2 < y) {
          if(y1 < y) {
            lastStagnantSelectionArea.y1 += 1;
          } else {
            lastStagnantSelectionArea.y2 += 1;
          }

          if(isPositionEqualArea(activeCellPosition, lastStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
          } else {
            handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
          }
        } else {
          if(y1 > y) {
            lastStagnantSelectionArea.y1 += 1;
          } else {
            lastStagnantSelectionArea.y2 += 1;
          }

          if(lastStagnantSelectionArea.y1 < rowCount && lastStagnantSelectionArea.y2 < rowCount) handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
        }
      
      } else {
        const y2 = y + 1;

        if(y2 < rowCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
      }
    } else {
      y++;
  
      if(y < rowCount) handleUpdateActiveCellPosition({ y });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas()
    }
  }

  arrowLeft(event, shiftKey) {
    let { 
      activeCellPosition,
      isEditMode,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleResetStagnantSelectionAreas
    } = this.props;
    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let lastStagnantSelectionArea = { ...stagnantSelectionAreas[stagnantSelectionAreasLength - 1] };

        const { x1, x2 } = lastStagnantSelectionArea;

        if(x1 > x || x2 > x) {
          if(x1 > x) {
            lastStagnantSelectionArea.x1 -= 1;
          } else {
            lastStagnantSelectionArea.x2 -= 1;
          }
          
          if(isPositionEqualArea(activeCellPosition, lastStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
          } else {
            handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
          }
        } else {
          if(x1 < x) {
            lastStagnantSelectionArea.x1 -= 1;
          } else {
            lastStagnantSelectionArea.x2 -= 1;
          }

          if(lastStagnantSelectionArea.x1 > 0 && lastStagnantSelectionArea.x2 > 0) handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
        }
      } else {
        const x2 = x - 1;

        if(x2 > 0) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
      }
    } else {
      x--;
  
      if(x > 0) handleUpdateActiveCellPosition({ x });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas()
    }
  }

  arrowRight(event, shiftKey) {
    let { 
      activeCellPosition,
      isEditMode,
      columnCount,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleResetStagnantSelectionAreas
    } = this.props;
    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let lastStagnantSelectionArea = { ...stagnantSelectionAreas[stagnantSelectionAreasLength - 1] };

        const { x1, x2 } = lastStagnantSelectionArea;

        if(x1 < x || x2 < x) {
          if(x1 < x) {
            lastStagnantSelectionArea.x1 += 1;
          } else {
            lastStagnantSelectionArea.x2 += 1;
          }

          if(isPositionEqualArea(activeCellPosition, lastStagnantSelectionArea)) {
            handleResetStagnantSelectionAreas();
          } else {
            handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
          }
        } else {
          if(x1 > x) {
            lastStagnantSelectionArea.x1 += 1;
          } else {
            lastStagnantSelectionArea.x2 += 1;
          }

          if(lastStagnantSelectionArea.x1 < columnCount && lastStagnantSelectionArea.x2 < columnCount) handleUpdateStagnantSelectionAreas([ lastStagnantSelectionArea ]);
        }
      
      } else {
        const x2 = x + 1;

        if(x2 < columnCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
      }
    } else {
      x++;
  
      if(x < columnCount) handleUpdateActiveCellPosition({ x });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas()
    }
  }

  tab(event, shiftKey, sheetContainerRef) {
    let { 
      isEditMode,

      activeCellPosition, 
      activeSelectionArea, 
      stagnantSelectionAreas, 
      activeCellSelectionAreaIndex,

      rowCount,
      columnCount,

      handleSetEditModeOff,
      handleUpdateActiveCellPosition,
      handleUpdateActiveCellSelectionAreaIndex
    } = this.props;

    event.preventDefault();

    const { current: SheetContainerInstance } = sheetContainerRef;

    if(isEditMode) {
      handleSetEditModeOff();
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

      selectionArea = { x1: 1, y1: 1, x2: columnCount - 1, y2: rowCount - 1 };
    }

    let { x1, y1, x2, y2 } = selectionArea;
    let { x, y } = activeCellPosition;

    // When shift key is enabled, perform the reverse of tab. We can do the same for y for the bounded case since we are not using y for unbounded
    if(shiftKey) {
      x--;
      y--;
    } else {
      x++;
      y++;
    }
    
    // Check for bounds -- do not update when isbounded and tab goes out bounds
    if((x < x1 && x < x2) || (x > x1 && x > x2)) {
      if(!isBounded) {
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

        handleUpdateActiveCellPosition({ x, y });
      }
    } else {
      handleUpdateActiveCellPosition({ x });
    }
  }

  mouseUp() {
    const { isSelectionMode, activeSelectionArea, stagnantSelectionAreas, handleResetActiveSelectionArea, handleUpdateStagnantSelectionAreas, handleUpdateActiveCellSelectionAreaIndex } = this.props;

    if(!isSelectionMode) return;

    this.setSelectionModeOff();

    const { x1, y1, x2, y2 } = activeSelectionArea;

    if(x1 !== x2 || y1 !== y2) {
      const newStagnantSelectionAreas = [ ...stagnantSelectionAreas, activeSelectionArea ];
      handleUpdateStagnantSelectionAreas(newStagnantSelectionAreas);
      handleUpdateActiveCellSelectionAreaIndex(newStagnantSelectionAreas.length - 1);
    }

    handleResetActiveSelectionArea();
  }

  startSelection(x1, y1, isMultiSelection) {
    const { handleUpdateActiveCellPosition, stagnantSelectionAreas, handleResetStagnantSelectionAreas, handleUpdateActiveSelectionArea } = this.props;

    if(!isMultiSelection && stagnantSelectionAreas) handleResetStagnantSelectionAreas(); 

    this.setEditModeOff();
    this.setSelectionModeOn();

    handleUpdateActiveCellPosition({ x: x1, y: y1 });
    handleUpdateActiveSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  selectOver(x2, y2, isMultiSelection) {
    const { isSelectionMode, activeCellPosition, stagnantSelectionAreas, activeCellSelectionAreaIndex, handleResetStagnantSelectionAreas, handleUpdateActiveSelectionArea, handleUpdateActiveCellSelectionAreaIndex } = this.props;

    if(!isSelectionMode) return;

    if(!isMultiSelection && stagnantSelectionAreas) handleResetStagnantSelectionAreas(); 

    const { x, y } = activeCellPosition;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    handleUpdateActiveSelectionArea({ x1: x, y1: y, x2, y2 });
    if(stagnantSelectionAreasLength !== activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(stagnantSelectionAreasLength);
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

  render() {
    return null;
  }
};