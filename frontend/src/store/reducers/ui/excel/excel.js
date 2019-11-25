import { combineReducers } from "redux";

import activeSelectionArea from "./activeSelectionArea";
import activeCellPosition from "./activeCellPosition";

import columnCount from "./columnCount";
import rowCount from "./rowCount";

import columnWidths from "./columnWidths";
import rowHeights from "./rowHeights";

import activeSheetName from "./activeSheetName";

import freezeColumnCount from "./freezeColumnCount";
import freezeRowCount from "./freezeRowCount";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

import sheetNames from "./sheetNames";

import sheetCellData from "./sheetCellData";

import stagnantSelectionAreas from "./stagnantSelectionAreas";

import activeCellSelectionAreaIndex from "./activeCellSelectionAreaIndex";

const excelReducer = combineReducers({ 
  sheetCellData,
  
  activeSelectionArea,
  stagnantSelectionAreas,

  activeCellPosition,
  activeCellSelectionAreaIndex,
  
  activeSheetName,
  sheetNames,

  freezeColumnCount,
  freezeRowCount,

  columnCount, 
  rowCount,

  columnWidths,
  rowHeights,

  isSelectionMode, 
  isEditMode 
});

export default excelReducer;
