import { saveActiveCellInputData } from '../tools/cell';

const SELECT_ALL = state => {
  let newState = { ...state };

  const { sheetColumnCount, sheetRowCount } = newState;

  newState = saveActiveCellInputData({
    newState,
  });

  newState.activeCellSelectionAreaIndex = 0;
  newState.stagnantSelectionAreas = [
    { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 },
  ];

  return newState;
};

export default SELECT_ALL;
