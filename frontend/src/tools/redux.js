import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

import { setOnline, setOffline } from "actions/app/isOnline";
import { updateAccount, clearAccount } from "actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen";

import { updateActiveSheetName, resetActiveSheetName } from "actions/ui/excel/activeSheetName";

import { updateSheetCellData, resetSheetCellData } from "actions/ui/excel/sheetCellData";

import { updateColumnCount, resetColumnCount } from "actions/ui/excel/columnCount";
import { updateRowCount, resetRowCount } from "actions/ui/excel/rowCount";

import { updateColumnWidths, resetColumnWidths } from "actions/ui/excel/columnWidths";
import { updateRowHeights, resetRowHeights } from "actions/ui/excel/rowHeights";

import { updateFreezeColumnCount, resetFreezeColumnCount } from "actions/ui/excel/freezeColumnCount";
import { updateFreezeRowCount, resetFreezeRowCount } from "actions/ui/excel/freezeRowCount";

import { updateSheetNames, resetSheetNames } from "actions/ui/excel/sheetNames";

import { setEditModeOff } from "actions/ui/excel/isEditMode";

import { resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";

import { resetActiveCellPosition } from "actions/ui/excel/activeCellPosition";

import { resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { setSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import { resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";


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
    sheetCellData,
    activeSheetName,
    
    columnCount,
    rowCount,

    columnWidths,
    rowHeights,
    
    freezeColumnCount,
    freezeRowCount,

    sheetNames
  }
) => {
  dispatch(updateSheetCellData(sheetCellData));
  dispatch(updateActiveSheetName(activeSheetName));

  dispatch(updateColumnCount(columnCount));
  dispatch(updateRowCount(rowCount));

  dispatch(updateColumnWidths(columnWidths));
  dispatch(updateRowHeights(rowHeights));

  dispatch(updateFreezeColumnCount(freezeColumnCount));
  dispatch(updateFreezeRowCount(freezeRowCount));

  dispatch(updateSheetNames(sheetNames));
};

export const resetWorkbook = (dispatch) => {
  dispatch(resetSheetCellData());
  dispatch(resetActiveSheetName());

  dispatch(resetColumnCount());
  dispatch(resetRowCount());

  dispatch(resetRowHeights());
  dispatch(resetColumnWidths());

  dispatch(resetFreezeColumnCount());
  dispatch(resetFreezeRowCount());

  dispatch(resetSheetNames());

  dispatch(setEditModeOff());

  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellPosition());
  dispatch(resetActiveCellSelectionAreaIndex());

  dispatch(setSelectionModeOff());

  dispatch(resetStagnantSelectionAreas());
  dispatch(resetActiveSelectionArea());
};