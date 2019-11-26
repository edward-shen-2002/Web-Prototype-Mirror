import { combineReducers } from "redux";

import activeSelectionArea from "./activeSelectionArea";
import activeCellPosition from "./activeCellPosition";

import activeSheetName from "./activeSheetName";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

import sheetNames from "./sheetNames";

import stagnantSelectionAreas from "./stagnantSelectionAreas";

import activeCellSelectionAreaIndex from "./activeCellSelectionAreaIndex";

import sheetsCellData from "./sheetsCellData";
import sheetsColumnCount from "./sheetsColumnCount";
import sheetsColumnWidths from "./sheetsColumnWidths";
import sheetsFreezeColumnCount from "./sheetsFreezeColumnCount";
import sheetsRowCount from "./sheetsRowCount";
import sheetsRowHeights from "./sheetsRowHeights";
import sheetsFreezeRowCount from "./sheetsFreezeRowCount";

const excelReducer = combineReducers({ 
  
  activeSheetName,
  sheetNames,
  
  activeSelectionArea,
  stagnantSelectionAreas,

  activeCellPosition,
  activeCellSelectionAreaIndex,
  
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
