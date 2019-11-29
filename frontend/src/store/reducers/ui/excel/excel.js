import { combineReducers } from "redux";

import activeCellInputValue from "./activeCellInputValue";
import activeCellPosition from "./activeCellPosition";
import activeCellSelectionAreaIndex from "./activeCellSelectionAreaIndex";
import activeSheetName from "./activeSheetName";
import activeSelectionArea from "./activeSelectionArea";
import activeCellInputAutoFocus from "./activeCellInputAutoFocus";

import stagnantSelectionAreas from "./stagnantSelectionAreas";
import sheetNames from "./sheetNames";
import scrollData from "./scrollData";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

import sheetsCellData from "./sheetsCellData";
import sheetsColumnCount from "./sheetsColumnCount";
import sheetsColumnWidths from "./sheetsColumnWidths";
import sheetsFreezeColumnCount from "./sheetsFreezeColumnCount";
import sheetsRowCount from "./sheetsRowCount";
import sheetsRowHeights from "./sheetsRowHeights";
import sheetsFreezeRowCount from "./sheetsFreezeRowCount";
import sheetsCellOffsets from "./sheetsCellOffsets";

const excelReducer = combineReducers({ 
  activeCellInputValue,
  activeSheetName,
  activeSelectionArea,
  activeCellPosition,
  activeCellSelectionAreaIndex,
  activeCellInputAutoFocus,
  
  stagnantSelectionAreas,
  sheetNames,
  scrollData,

  isSelectionMode, 
  isEditMode,

  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount,
  sheetsCellOffsets
});

export default excelReducer;
