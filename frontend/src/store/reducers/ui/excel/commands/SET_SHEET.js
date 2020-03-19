  // ! TODO : Add parameters here for hyperlinks?
  const SET_SHEET = (
    state,
    {
      sheetGridRef,
      sheetName
    }
  ) => {
    const {
      name,
      activeCellPosition,
      activeCellInputData,
      activeSheetName,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetFreezeRowCount,
      sheetRowHeights,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas
    } = state;

    let newState = { ...state };

    let currentSheetData = {
      name,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetFreezeRowCount,
      sheetRowHeights,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas
    };
    
    let newActiveSheetData = newState.inactiveSheets[sheetName];

    newState.inactiveSheets[activeSheetName] = currentSheetData;
    newState.inactiveSheets[sheetName] = undefined;
    
    // ! Need to updae active cell input data!
    newState = {
      ...newActiveSheetData,
      activeSheetName: sheetName,

      // ! Update this for the new sheet!!
      activeCellInputData
    };

    sheetGridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });

    return newState;
  };

  export default SET_SHEET;