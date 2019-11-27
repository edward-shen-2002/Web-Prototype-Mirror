import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateActiveCellInputValue, resetActiveCellInputValue } from "actions/ui/excel/activeCellInputValue";
import { updateActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { updateActiveSelectionArea, resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellSelectionAreaIndex, resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";

import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { updateSheetCellData } from "actions/ui/excel/sheetsCellData";

import { isPositionEqualArea } from "tools/excel";

const mapStateToProps = ({ 
  ui: { 
    excel: { 
      activeCellInputValue,
      activeCellPosition,
      activeSelectionArea, 
      activeCellSelectionAreaIndex,

      activeSheetName,

      stagnantSelectionAreas,
      
      isSelectionMode, 
      isEditMode,

      sheetsColumnCount,
      sheetsRowCount,

      sheetsCellData
    } 
  } 
}) => ({ 
  activeCellInputValue,
  activeCellPosition,
  activeSelectionArea, 
  activeCellSelectionAreaIndex,

  activeSheetName,

  stagnantSelectionAreas,
  
  isSelectionMode, 
  isEditMode,

  sheetsColumnCount,
  sheetsRowCount,

  sheetsCellData
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

  handleChangeSheetCellData: (sheetName, sheetsCellData) => dispatch(updateSheetCellData(sheetName, sheetsCellData)),

  handleUpdateActiveCellInputValue: (value) => dispatch(updateActiveCellInputValue(value)),
  handleResetActiveCellInputValue: () => dispatch(resetActiveCellInputValue())
});

let EventListener = ({ 
  eventListenerRef, 
  
  activeCellInputValue,
  activeSheetName,
  activeCellPosition,
  activeSelectionArea,
  activeCellSelectionAreaIndex,

  sheetsColumnCount,
  sheetsRowCount,
  sheetsCellData,

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
  handleSetEditModeOff,

  handleChangeSheetCellData,

  handleUpdateActiveCellInputValue,
  handleResetActiveCellInputValue
}) => (
  <EventRedux 
    ref={eventListenerRef} 

    sheetsRowCount={sheetsRowCount}
    sheetsColumnCount={sheetsColumnCount}
    sheetsCellData={sheetsCellData}
    
    activeCellInputValue={activeCellInputValue}
    activeSheetName={activeSheetName}
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

    handleChangeSheetCellData={handleChangeSheetCellData}

    handleUpdateActiveCellInputValue={handleUpdateActiveCellInputValue}
    handleResetActiveCellInputValue={handleResetActiveCellInputValue}
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
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { y1, y2 } = focusedStagnantSelectionArea;

        if(y1 > y || y2 > y) {
          if(y1 > y) {
            focusedStagnantSelectionArea.y1 -= 1;
          } else {
            focusedStagnantSelectionArea.y2 -= 1;
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
          } else {
            focusedStagnantSelectionArea.y2 -= 1;
          }

          if(focusedStagnantSelectionArea.y1 > 0 && focusedStagnantSelectionArea.y2 > 0) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      } else {
        const y2 = y - 1;

        if(y2 > 0) {
          handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
          if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
        }
      }
    } else {
      y--;
  
      if(y > 0) handleUpdateActiveCellPosition({ y });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowDown(event, shiftKey) {
    let { 
      activeSheetName,
      activeCellPosition,
      isEditMode,
      activeCellSelectionAreaIndex,
      sheetsRowCount,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();

    const sheetRowCount = sheetsRowCount[activeSheetName];
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { y1, y2 } = focusedStagnantSelectionArea;

        if(y1 < y || y2 < y) {
          if(y1 < y) {
            focusedStagnantSelectionArea.y1 += 1;
          } else {
            focusedStagnantSelectionArea.y2 += 1;
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
          } else {
            focusedStagnantSelectionArea.y2 += 1;
          }

          if(focusedStagnantSelectionArea.y1 < sheetRowCount && focusedStagnantSelectionArea.y2 < sheetRowCount) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      
      } else {
        const y2 = y + 1;

        if(y2 < sheetRowCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2: x, y1: y, y2 } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      y++;
  
      if(y < sheetRowCount) handleUpdateActiveCellPosition({ y });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowLeft(event, shiftKey) {
    let { 
      activeCellPosition,
      activeCellSelectionAreaIndex,
      isEditMode,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;

    let { x, y } = activeCellPosition;
    
    event.preventDefault();
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, x2 } = focusedStagnantSelectionArea;

        if(x1 > x || x2 > x) {
          if(x1 > x) {
            focusedStagnantSelectionArea.x1 -= 1;
          } else {
            focusedStagnantSelectionArea.x2 -= 1;
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
            focusedStagnantSelectionArea.x1 -= 1;
          } else {
            focusedStagnantSelectionArea.x2 -= 1;
          }

          if(focusedStagnantSelectionArea.x1 > 0 && focusedStagnantSelectionArea.x2 > 0) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      } else {
        const x2 = x - 1;

        if(x2 > 0) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      x--;
  
      if(x > 0) handleUpdateActiveCellPosition({ x });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  arrowRight(event, shiftKey) {
    let { 
      activeSheetName,
      activeCellPosition,
      activeCellSelectionAreaIndex,
      isEditMode,
      sheetsColumnCount,
      stagnantSelectionAreas,
      handleUpdateActiveCellPosition,
      handleUpdateStagnantSelectionAreas,
      handleUpdateActiveCellSelectionAreaIndex,
      handleResetStagnantSelectionAreas,
      handleResetActiveCellSelectionAreaIndex
    } = this.props;

    if(isEditMode) return;
    
    let { x, y } = activeCellPosition;

    event.preventDefault();
    
    const sheetColumnCount = sheetsColumnCount[activeSheetName];
    
    if(shiftKey) { 
      const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

      if(stagnantSelectionAreasLength) {
        let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

        const { x1, x2 } = focusedStagnantSelectionArea;

        if(x1 < x || x2 < x) {
          if(x1 < x) {
            focusedStagnantSelectionArea.x1 += 1;
          } else {
            focusedStagnantSelectionArea.x2 += 1;
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
          } else {
            focusedStagnantSelectionArea.x2 += 1;
          }

          if(focusedStagnantSelectionArea.x1 < sheetColumnCount && focusedStagnantSelectionArea.x2 < sheetColumnCount) {
            handleUpdateStagnantSelectionAreas([ focusedStagnantSelectionArea ]);
            if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
          }
        }
      
      } else {
        const x2 = x + 1;

        if(x2 < sheetColumnCount) handleUpdateStagnantSelectionAreas([ { x1: x, x2, y1: y, y2: y } ]);
        if(activeCellSelectionAreaIndex) handleUpdateActiveCellSelectionAreaIndex(0);
      }
    } else {
      x++;
  
      if(x < sheetColumnCount) handleUpdateActiveCellPosition({ x });
      if(stagnantSelectionAreas) handleResetStagnantSelectionAreas();
      if(activeCellSelectionAreaIndex >= 0) handleResetActiveCellSelectionAreaIndex();
    }
  }

  tab(event, shiftKey, sheetContainerRef) {
    let { 
      isEditMode,

      activeSheetName,
      activeCellPosition, 
      activeSelectionArea, 
      stagnantSelectionAreas, 
      activeCellSelectionAreaIndex,

      sheetsRowCount,
      sheetsColumnCount,

      handleSetEditModeOff,
      handleUpdateActiveCellPosition,
      handleUpdateActiveCellSelectionAreaIndex
    } = this.props;

    event.preventDefault();

    const { current: SheetContainerInstance } = sheetContainerRef;

    const sheetRowCount = sheetsRowCount[activeSheetName];
    const sheetColumnCount = sheetsColumnCount[activeSheetName];

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

  enter(event, shiftKey, sheetContainerRef) {
    let { 
      isEditMode,

      activeSheetName,
      activeCellPosition, 
      activeSelectionArea, 
      stagnantSelectionAreas, 
      activeCellSelectionAreaIndex,

      sheetsRowCount,
      sheetsColumnCount,

      handleSetEditModeOff,
      handleUpdateActiveCellPosition,
      handleUpdateActiveCellSelectionAreaIndex
    } = this.props;

    event.preventDefault();

    let { x, y } = activeCellPosition;

    const { current: SheetContainerInstance } = sheetContainerRef;
    const sheetRowCount = sheetsRowCount[activeSheetName];
    const sheetColumnCount = sheetsColumnCount[activeSheetName];

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

    if(shiftKey) {
      x--;
      y--;
    } else {
      x++;
      y++;
    }
    
    // Check for bounds -- do not update when isbounded and tab goes out bounds
    if((y < y1 && y < y2) || (y > y1 && y > y2)) {
      if(!isBounded) {
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

        handleUpdateActiveCellPosition({ x, y });
      }
    } else {
      handleUpdateActiveCellPosition({ y });
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

      sheetsCellData,
      sheetsRowCount,
      sheetsColumnCount,

      handleChangeSheetCellData
    } = this.props;

    if(isEditMode) return;

    if(activeCellSelectionAreaIndex >= 0) {
      const sheetRowCount = sheetsRowCount[activeSheetName];
      const sheetColumnCount = sheetsColumnCount[activeSheetName];
      const sheetCellData = sheetsCellData[activeSheetName];

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
              ? { ...cellData, value: undefined }
              : cellData
          );
        }

        newSheetCellData.push(rowData);
      }

      handleChangeSheetCellData(activeSheetName, newSheetCellData);
    } else {
      const { x, y } = activeCellPosition;

      this.changeValue(y, x, { value: undefined });
    }
  }

  changeActiveInputValue(value) {
    const { handleUpdateActiveCellInputValue } = this.props;

    handleUpdateActiveCellInputValue(value);
  }

  changeValue(row, column, data) {
    const { activeSheetName, sheetsCellData, handleChangeSheetCellData } = this.props;

    const sheetCellData = sheetsCellData[activeSheetName];

    const newSheetCellData = [
      ...sheetCellData.slice(0, row),
      [ ...sheetCellData[row].slice(0, column), { ...sheetCellData[row][column], ...data }, ...sheetCellData[row].slice(column + 1) ],
      ...sheetCellData.slice(row + 1),
    ];

    handleChangeSheetCellData(activeSheetName, newSheetCellData);
  }

  clickRowHeader(row, ctrlKey) {
    const {
      activeSheetName,
      sheetsColumnCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
      handleUpdateActiveCellPosition
    } = this.props;
    
    const sheetColumnCount = sheetsColumnCount[activeSheetName];

    this.saveActiveCellInputValue();

    handleUpdateActiveCellPosition({ x: 1, y: row });

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
      activeSheetName,
      sheetsRowCount,
      activeCellSelectionAreaIndex,
      stagnantSelectionAreas,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
      handleUpdateActiveCellPosition
    } = this.props;

    const sheetRowCount = sheetsRowCount[activeSheetName];

    this.saveActiveCellInputValue();

    handleUpdateActiveCellPosition({ x: column, y: 1 });

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

      this.changeValue(y, x, { value: activeCellInputValue });

      this.resetActiveCellInputValue();

      this.setEditModeOff();
    }
  }

  clickRootHeader() {
    const {
      activeSheetName,
      sheetsColumnCount,
      sheetsRowCount,
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveCellSelectionAreaIndex,
      handleUpdateActiveCellPosition
    } = this.props;

    const sheetColumnCount = sheetsColumnCount[activeSheetName];
    const sheetRowCount = sheetsRowCount[activeSheetName];

    this.saveActiveCellInputValue();

    handleUpdateActiveCellPosition({ x: 1, y: 1 });

    handleUpdateActiveCellSelectionAreaIndex(0);
    handleUpdateStagnantSelectionAreas([ { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 } ]);
  }

  startEditMode(key) {
    const { isEditMode, handleUpdateActiveCellInputValue } = this.props;

    if(isEditMode) return;

    handleUpdateActiveCellInputValue(key);

    this.setEditModeOn();
  }

  doubleClickEditableCell() {
    const { activeCellPosition, activeSheetName, sheetsCellData, handleUpdateActiveCellInputValue } = this.props;

    const { x, y } = activeCellPosition;

    const sheetCellData = sheetsCellData[activeSheetName];

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

  startSelection(x1, y1, ctrlKey) {
    const { 
      activeCellPosition, 
      stagnantSelectionAreas, 
      handleResetStagnantSelectionAreas, 
      handleUpdateActiveCellPosition, 
      handleUpdateStagnantSelectionAreas, 
      handleUpdateActiveSelectionArea, 
      handleUpdateActiveCellSelectionAreaIndex 
    } = this.props;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    if(!ctrlKey && stagnantSelectionAreasLength) handleResetStagnantSelectionAreas(); 

    this.saveActiveCellInputValue();

    this.setSelectionModeOn();

    if(ctrlKey) {
      const { x, y } = activeCellPosition;
      handleUpdateActiveCellSelectionAreaIndex(stagnantSelectionAreasLength + 1);
      handleUpdateActiveSelectionArea({ x1, y1, x2: x1, y2: y1 });

      if(!stagnantSelectionAreasLength && x1 !== x && y1 !== y) handleUpdateStagnantSelectionAreas([ { x1: x, y1: y, x2: x, y2: y } ]);
    } 

    handleUpdateActiveCellPosition({ x: x1, y: y1 });
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

  render() {
    return null;
  }
};