import { saveActiveCellInputData } from "./tools/cell";

const SELECT_ALL = (
  state, 
  {
    event
  }
) => {
  const {
    sheetColumnCount,
    sheetRowCount
  } = state;

  let newState = { ...newState };

  if(event) event.preventDefault();

  newState = saveActiveCellInputData({
    newState
  });

  newState.activeCellSelectionAreaIndex = 0;
  newState.stagnantSelectionAreas =[ { x1: 1, y1: 1, x2: sheetColumnCount - 1, y2: sheetRowCount - 1 } ];
};

export default SELECT_ALL;