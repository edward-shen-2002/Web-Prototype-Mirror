import { saveActiveCellInputData, updateActiveCellPosition } from '../tools/cell';

const SELECT_ROW = (state, { row, ctrlKey }) => {
  const {
    activeCellPosition,
    sheetColumnCount,
    activeCellSelectionAreaIndex,
    stagnantSelectionAreas,
  } = state;

  let newState = { ...state };

  newState = saveActiveCellInputData({ newState });

  newState = updateActiveCellPosition({
    newState,
    newY: row,
    newX: 1,
  });

  const rowArea = { x1: 1, y1: row, x2: sheetColumnCount - 1, y2: row };

  if (ctrlKey) {
    const { x, y } = activeCellPosition;

    let newStagnantSelectionAreas = [];

    if (stagnantSelectionAreas.length) {
      newStagnantSelectionAreas = [...stagnantSelectionAreas];
    } else if (y !== row) {
      newStagnantSelectionAreas.push({ x1: x, x2: x, y1: y, y2: y });
    }

    newStagnantSelectionAreas.push(rowArea);

    newState.activeCellSelectionAreaIndex = activeCellSelectionAreaIndex + 1;
    newState.stagnantSelectionAreas = newStagnantSelectionAreas;
  } else {
    newState.activeCellSelectionAreaIndex = 0;
    newState.stagnantSelectionAreas = [rowArea];
  }

  return newState;
};

export default SELECT_ROW;
