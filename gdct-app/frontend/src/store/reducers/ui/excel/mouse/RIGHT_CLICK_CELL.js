import { updateActiveCellPosition } from '../tools/cell';

const RIGHT_CLICK_CELL = (state, { row, column }) => {
  const { stagnantSelectionAreas } = state;

  let newState = { ...state };

  newState.isEditMode = false;

  const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

  if (stagnantSelectionAreasLength) {
    const { x1, x2, y1, y2 } = stagnantSelectionAreas[stagnantSelectionAreasLength - 1];

    if (
      ((x1 <= column && column <= x2) || (x2 <= column && column <= x1)) &&
      ((y1 <= row && row <= y2) || (y2 <= row && row <= y1))
    )
      return state;
  }

  newState.stagnantSelectionAreas = [];
  newState = updateActiveCellPosition({
    newState,
    newY: row,
    newX: column,
  });

  return newState;
};

export default RIGHT_CLICK_CELL;
