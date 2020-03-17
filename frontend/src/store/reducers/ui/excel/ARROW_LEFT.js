const ARROW_LEFT = (
  state, 
  {
    event, 
    shiftKey
   }
 ) => {
  let { 
    sheetCellData,
    activeCellPosition,
    activeCellSelectionAreaIndex,
    isEditMode,
    stagnantSelectionAreas
  } = state;

  if(isEditMode) return state;

  let newState = { ...state };

  let { x, y } = activeCellPosition;
  
  event.preventDefault();

  newState.activeSelectionArea = null;

  const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

  if(shiftKey) { 
    if(stagnantSelectionAreasLength) {
      let focusedStagnantSelectionArea = { ...stagnantSelectionAreas[activeCellSelectionAreaIndex] };

      const { x1, y1, x2, y2 } = focusedStagnantSelectionArea;

      const minY = Math.min(y1, y2);
      const minX = Math.min(x1, x2);
      const maxY = Math.max(y1, y2);
      const maxX = Math.max(x1, x2);

      // Consider min vertical area of active cell
      const minArea = getWholeArea({ 
        minX: x, 
        maxX: x,
        minY, 
        maxY, 
        sheetCellData 
      });

      // Shrink right
      if(maxX > x && maxX !== minArea.x2) {
        const { x1: newMaxX } = getWholeArea({
          minX: maxX,
          minY,
          maxX,
          maxY,
          sheetCellData
        });

        focusedStagnantSelectionArea = {
          x1: minX,
          y1: minY,
          y2: maxY,
          x2: newMaxX - 1
        };

        scrollTo(x1 > x ? y1 : y2, focusedStagnantSelectionArea.x2)
        
        if(isPositionEqualArea(activeCellPosition, focusedStagnantSelectionArea)) {
          newState.stagnantSelectionAreas = [];
          newState.activeCellSelectionAreaIndex = -1;
        } else {
          newState.stagnantSelectionAreas = [ focusedStagnantSelectionArea ];
          newState.activeCellSelectionAreaIndex = 0;
        }
      } else {
        focusedStagnantSelectionArea = getWholeArea({
          minX: minX - 1,
          minY,
          maxX,
          maxY,
          sheetCellData
        });

        console.log("2")

        scrollTo(x1 < x ? y1 : y2, focusedStagnantSelectionArea.x1);

        if(focusedStagnantSelectionArea.x1 > 0 && focusedStagnantSelectionArea.x2 > 0) {
          newState.stagnantSelectionAreas = [ focusedStagnantSelectionArea ]; 
          newState.activeCellSelectionAreaIndex = 0;
        }
      }
    } else {
      let x1;
      let x2;
      let y1;
      let y2;

      // Check if current cell is merged
      if(sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].merged) {
        const { 
          x1: mergedX1,
          x2: mergedX2,
          y1: mergedY1,
          y2: mergedY2,
        } = sheetCellData[y][x].merged;
        x1 = mergedX1 - 1;
        x2 = mergedX2;
        y1 = mergedY1;
        y2 = mergedY2;
      } else {
        x1 = x - 1;
        x2 = x;
        y1 = y;
        y2 = y;
      }

      // Check for max area after movement
      const minArea = getWholeArea({ 
        minX: x1, 
        minY: y1, 
        maxX: x2, 
        maxY: y2, 
        sheetCellData 
      });

      if(x1 > 0) {
        newState.stagnantSelectionAreas = [ minArea ];
        newState.activeCellSelectionAreaIndex = 0;
        scrollTo(y, minArea.x1);
      } else {
        scrollTo(y, x);
      }
    }
  } else {
    if(sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].merged) {
      const { merged } = sheetCellData[y][x];

      const { x1 } = merged;

      x = x1 - 1;
    } else {
      x--;
    }

    if(x > 0) newState.activeCellPosition = { y, x };
    newState.stagnantSelectionAreas = [];
    newState.activeCellSelectionAreaIndex = -1;
  }

  return newState;
};

export default ARROW_LEFT;