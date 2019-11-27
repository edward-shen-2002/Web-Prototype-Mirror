import { combineReducers } from "redux";

import activeCellInputValue from "./activeCellInputValue";
import activeCellPosition from "./activeCellPosition";
import activeCellSelectionAreaIndex from "./activeCellSelectionAreaIndex";
import activeSheetName from "./activeSheetName";
import activeSelectionArea from "./activeSelectionArea";
import activeCellInputAutoFocus from "./activeCellInputAutoFocus";

import stagnantSelectionAreas from "./stagnantSelectionAreas";
import sheetNames from "./sheetNames";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

import sheetsCellData from "./sheetsCellData";
import sheetsColumnCount from "./sheetsColumnCount";
import sheetsColumnWidths from "./sheetsColumnWidths";
import sheetsFreezeColumnCount from "./sheetsFreezeColumnCount";
import sheetsRowCount from "./sheetsRowCount";
import sheetsRowHeights from "./sheetsRowHeights";
import sheetsFreezeRowCount from "./sheetsFreezeRowCount";

const excelReducer = combineReducers({ 
  activeCellInputValue,
  activeSheetName,
  activeSelectionArea,
  activeCellPosition,
  activeCellSelectionAreaIndex,
  activeCellInputAutoFocus,
  
  stagnantSelectionAreas,
  sheetNames,

  isSelectionMode, 
  isEditMode,

  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount
});

export default excelReducer;
