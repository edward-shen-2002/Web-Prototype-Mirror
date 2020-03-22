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
      activeCellSelectionAreaIndex,
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
      stagnantSelectionAreas,
      activeCellSelectionAreaIndex
    };

    
    let newActiveSheetData = newState.inactiveSheets[sheetName];

    newState.inactiveSheets[activeSheetName] = currentSheetData;
    newState.inactiveSheets[sheetName] = undefined;
    
    // ! Need to updae active cell input data!
    newState = {
      ...newState,
      ...newActiveSheetData,
      activeSheetName: sheetName,

      // ! Update this for the new sheet!!
      activeCellInputData,

      activeCellDialog: null,
      activeSelectionArea: null,
      activeCellInputAutoFocus: true,

      rowResizeData: null,
      columnResizeData: null,
      freezeRowResizeData: null,
      freezeColumnResizeData: null,

      scrollData: {
        horizontalScrollDirection: "forward",
        scrollLeft: 0,
        scrollTop: 0,
        scrollUpdateWasRequested: false,
        verticalScrollDirection: "forward"
      },

      cursorType: "default",
    
      isSelectionMode: false,
      isEditMode: false,
      isColumnResizeMode: false,
      isFreezeColumnResizeMode: false,
      isRowResizeMode: false,
      isFreezeRowResizeMode: false,
    };

    sheetGridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });

    return newState;
  };

  export default SET_SHEET;