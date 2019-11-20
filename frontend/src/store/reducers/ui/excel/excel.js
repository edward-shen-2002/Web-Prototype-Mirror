import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

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

import sheetCellValues from "./sheetCellValues";

const excelReducer = combineReducers({ 
  sheetCellValues,
  
  selectionArea,
  
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