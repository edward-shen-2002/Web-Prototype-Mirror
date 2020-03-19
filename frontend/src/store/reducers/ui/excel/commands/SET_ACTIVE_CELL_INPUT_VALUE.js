const SET_ACTIVE_CELL_INPUT_VALUE = (
  state,
  {
    value
  }
) => {
  let newState = { ...state };

  newState.activeCellInputData = {
    ...newState.activeCellInputData,
    formulaValue: [ ...value ],
    cellValue: [ ...value ]
  };

  return newState;
};

export default SET_ACTIVE_CELL_INPUT_VALUE;