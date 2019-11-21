import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { isPositionEqualArea } from "tools/excel";

const mapStateToProps = ({ 
  ui: { 
    excel: { 
      activeCellPosition,
      activeSelectionArea, 

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

  columnCount,
  rowCount,

  isSelectionMode,
  isEditMode,

  stagnantSelectionAreas,

  handleUpdateActiveCellPosition,

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

    stagnantSelectionAreas={stagnantSelectionAreas}

    isSelectionMode={isSelectionMode}
    isEditMode={isEditMode}

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

  mouseUp() {
    const { isSelectionMode, activeSelectionArea, stagnantSelectionAreas, handleResetActiveSelectionArea, handleUpdateStagnantSelectionAreas } = this.props;

    if(!isSelectionMode) return;

    this.setSelectionModeOff();

    const { x1, y1, x2, y2 } = activeSelectionArea;

    if(x1 !== x2 || y1 !== y2) handleUpdateStagnantSelectionAreas([ ...stagnantSelectionAreas, activeSelectionArea ]);

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
    const { isSelectionMode, stagnantSelectionAreas, handleResetStagnantSelectionAreas, handleUpdateActiveSelectionArea } = this.props;

    if(!isSelectionMode) return;

    if(!isMultiSelection && stagnantSelectionAreas) handleResetStagnantSelectionAreas(); 

    handleUpdateActiveSelectionArea({ x2, y2 });
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

  render() {
    return null;
  }
};