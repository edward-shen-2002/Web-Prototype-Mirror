import { combineReducers } from "redux";

import name from "./name";

import activeCellInputData from "./activeCellInputData";
import activeCellPosition from "./activeCellPosition";
import activeCellSelectionAreaIndex from "./activeCellSelectionAreaIndex";
import activeSheetName from "./activeSheetName";
import activeSelectionArea from "./activeSelectionArea";
import activeCellInputAutoFocus from "./activeCellInputAutoFocus";

import stagnantSelectionAreas from "./stagnantSelectionAreas";
import sheetNames from "./sheetNames";
import scrollData from "./scrollData";
import cursorType from "./cursorType";

import isSelectionMode from "./isSelectionMode";
import isEditMode from "./isEditMode";

import isFreezeColumnResizeMode from "./isFreezeColumnResizeMode";
import isFreezeRowResizeMode from "./isFreezeRowResizeMode";
import isColumnResizeMode from "./isColumnResizeMode";
import isRowResizeMode from "./isRowResizeMode";

import rowResizeData from "./rowResizeData";
import columnResizeData from "./columnResizeData";
import freezeRowResizeData from "./freezeRowResizeData";
import freezeColumnResizeData from "./freezeColumnResizeData";

import sheetCellData from "./sheetCellData";
import sheetColumnCount from "./sheetColumnCount";
import sheetColumnWidths from "./sheetColumnWidths";
import sheetFreezeColumnCount from "./sheetFreezeColumnCount";
import sheetRowCount from "./sheetRowCount";
import sheetRowHeights from "./sheetRowHeights";
import sheetFreezeRowCount from "./sheetFreezeRowCount";
import sheetHiddenColumns from "./sheetHiddenColumns";
import sheetHiddenRows from "./sheetHiddenRows";
import sheetTemplateIdMapping from "./sheetTemplateIdMapping";

import isTemplateIdMappingDialogOpen from "./isTemplateIdMappingDialogOpen";
import contextMenuData from "./contextMenuData";

const excelReducer = combineReducers({ 
  name,
  
  activeCellInputData,
  activeSheetName,
  activeSelectionArea,
  activeCellPosition,
  activeCellSelectionAreaIndex,
  activeCellInputAutoFocus,

  rowResizeData,
  columnResizeData,
  freezeRowResizeData,
  freezeColumnResizeData,
  
  stagnantSelectionAreas,
  sheetNames,
  scrollData,
  cursorType,

  isSelectionMode, 
  isEditMode,
  
  isColumnResizeMode,
  isFreezeColumnResizeMode,
  isRowResizeMode,
  isFreezeRowResizeMode,

  sheetCellData,
  sheetColumnCount,
  sheetColumnWidths,
  sheetFreezeColumnCount,
  sheetRowCount,
  sheetRowHeights,
  sheetFreezeRowCount,
  sheetHiddenColumns,
  sheetHiddenRows,
  sheetTemplateIdMapping,

  isTemplateIdMappingDialogOpen,
  contextMenuData
});

export default excelReducer;
