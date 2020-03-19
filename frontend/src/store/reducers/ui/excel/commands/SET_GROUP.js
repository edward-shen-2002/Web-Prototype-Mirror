const CHANGE_GROUP = (
  state,
  {
    type, 
    newGroups
  }
) => {
  let { 
    sheetCellData,
    activeCellPosition: { y }
  } = state;

  let newState = { ...state };

  let newSheetCellData = { ...sheetCellData };

  // ! TODO
  if(type === "attribute") {

  } else {
    let groupIds = newGroups.map(({ id }) => id).join(" - ");
    let groupValues = newGroups.map(({ value }) => value).join(" - ");

    if(!newSheetCellData[y]) newSheetCellData[y] = {};

    newSheetCellData[y][2] = { value: groupIds };
    newSheetCellData[y][3] = { value: groupValues };

    newState.sheetCellData = newSheetCellData;
    newState.activeCellDialog = "";
  }

  return newState;
};

export default CHANGE_GROUP;