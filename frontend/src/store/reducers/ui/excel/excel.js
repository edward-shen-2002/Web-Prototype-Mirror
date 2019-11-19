import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

import columnCount from "./columnCount";
import rowCount from "./rowCount";

import activeSheetIndex from "./activeSheetIndex";

import freezeColumnCount from "./freezeColumnCount";
import freezeRowCount from "./freezeRowCount";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

const excelReducer = combineReducers({ 
  selectionArea,
  
  activeSheetIndex,

  freezeColumnCount,
  freezeRowCount,

  columnCount, 
  rowCount,

  isSelectionMode, 
  isEditMode 
});

export default excelReducer;