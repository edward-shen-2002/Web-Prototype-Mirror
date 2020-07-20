import { updateActiveCellPosition, saveActiveCellInputData } from '../tools/cell';

// ! should be triggered in START_SELECTION instead
const SELECT_COLUMN = (state, { column, ctrlKey }) => {
  const {
    activeCellPosition,
    sheetRowCount,
    activeCellSelectionAreaIndex,
    stagnantSelectionAreas,
  } = state;

  let newState = { ...state };

  newState = saveActiveCellInputData({ newState });

  const columnArea = { x1: column, y1: 1, x2: column, y2: sheetRowCount - 1 };

  if (ctrlKey) {
    const { x, y } = activeCellPosition;

    let newStagnantSelectionAreas = [];

    if (stagnantSelectionAreas.length) {
      newStagnantSelectionAreas = [...stagnantSelectionAreas];
    } else if (x !== column) {
      newStagnantSelectionAreas.push({ x1: x, x2: x, y1: y, y2: y });
    }

    newStagnantSelectionAreas.push(columnArea);
    newState.activeSelectionAreaIndex = activeCellSelectionAreaIndex + 1;
    newState.stagnantSelectionAreas = newStagnantSelectionAreas;
  } else {
    newState.activeSelectionAreaIndex = 0;
    newState.stagnantSelectionAreas = [columnArea];
  }

  newState = updateActiveCellPosition({
    newState,
    newY: 1,
    newX: column,
  });

  return newState;
};

export default SELECT_COLUMN;
