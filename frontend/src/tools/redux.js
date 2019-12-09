import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

import { setOnline, setOffline } from "actions/app/isOnline";
import { updateAccount, clearAccount } from "actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen";

import { updateActiveCellInputData, resetActiveCellInputData } from "actions/ui/excel/activeCellInputData";
import { updateActiveSheetName, resetActiveSheetName } from "actions/ui/excel/activeSheetName";
import { resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellPosition, resetActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { updateSheetNames, resetSheetNames } from "actions/ui/excel/sheetNames";
import { resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";
import { resetScrollData } from "actions/ui/excel/scrollData";

import { setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOff } from "actions/ui/excel/isEditMode";

import { setActiveCellInputAutoFocusOff } from "actions/ui/excel/activeCellInputAutoFocus";

import { updateSheetCellData, resetSheetCellData } from "actions/ui/excel/sheetCellData";
import { updateSheetColumnCount, resetSheetColumnCount } from "actions/ui/excel/sheetColumnCount";
import { updateSheetRowCount, resetSheetRowCount } from "actions/ui/excel/sheetRowCount";
import { updateSheetColumnWidths, resetSheetColumnWidths } from "actions/ui/excel/sheetColumnWidths";
import { updateSheetRowHeights, resetSheetRowHeights } from "actions/ui/excel/sheetRowHeights";
import { updateSheetFreezeColumnCount, resetSheetFreezeColumnCount } from "actions/ui/excel/sheetFreezeColumnCount";
import { updateSheetFreezeRowCount, resetSheetFreezeRowCount } from "actions/ui/excel/sheetFreezeRowCount";
import { updateSheetHiddenColumns, resetSheetHiddenColumns } from "actions/ui/excel/sheetHiddenColumns";
import { updateSheetHiddenRows, resetSheetHiddenRows } from "actions/ui/excel/sheetHiddenRows";

import pako from "pako";

export const loadUserState = (dispatch, { user, token }) => {
  if(token) {
    saveToken(token);
    setAxiosToken(token);
  }

  dispatch(setOnline());
  dispatch(updateAccount(user));
  dispatch(showAppNavigation());
};

export const resetUserState = (dispatch) => {
  deleteAxiosToken();
  deleteToken();

  dispatch(setOffline());

  dispatch(clearAccount());

  dispatch(hideAppNavigation());
};

export const loadWorkbook = (
  dispatch, 
  { 
    activeCellPosition,
    activeCellInputData,
    activeSheetName,

    sheetNames,
    
    sheetCellData,
    sheetColumnCount,
    sheetRowCount,
    sheetColumnWidths,
    sheetRowHeights,
    sheetFreezeColumnCount,
    sheetFreezeRowCount,
    sheetHiddenColumns,
    sheetHiddenRows
  }
) => {
  dispatch(updateActiveCellInputData(activeCellInputData));
  dispatch(updateActiveCellPosition(activeCellPosition));
  dispatch(updateActiveSheetName(activeSheetName));
  
  if(sheetNames) dispatch(updateSheetNames(sheetNames));

  dispatch(updateSheetCellData(sheetCellData));
  dispatch(updateSheetRowCount(sheetRowCount));
  dispatch(updateSheetColumnCount(sheetColumnCount));
  dispatch(updateSheetColumnWidths(sheetColumnWidths));
  dispatch(updateSheetRowHeights(sheetRowHeights));
  dispatch(updateSheetFreezeColumnCount(sheetFreezeColumnCount));
  dispatch(updateSheetFreezeRowCount(sheetFreezeRowCount));
  dispatch(updateSheetHiddenColumns(sheetHiddenColumns));
  dispatch(updateSheetHiddenRows(sheetHiddenRows));
};

export const resetWorkbook = (dispatch) => {
  dispatch(resetSheetCellData());
  dispatch(resetActiveSheetName());
  dispatch(resetSheetColumnCount());
  dispatch(resetSheetRowCount());
  dispatch(resetSheetRowHeights());
  dispatch(resetSheetColumnWidths());
  dispatch(resetSheetFreezeColumnCount());
  dispatch(resetSheetFreezeRowCount());
  dispatch(resetSheetHiddenColumns());
  dispatch(resetSheetHiddenRows());

  dispatch(resetSheetNames());

  dispatch(setEditModeOff());

  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellPosition());
  dispatch(resetActiveCellSelectionAreaIndex());

  dispatch(setSelectionModeOff());

  dispatch(resetStagnantSelectionAreas());
  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellInputData());
  dispatch(resetScrollData());

  dispatch(setActiveCellInputAutoFocusOff());
};