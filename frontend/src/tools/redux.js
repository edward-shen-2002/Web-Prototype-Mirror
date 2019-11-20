import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

import { setOnline, setOffline } from "actions/app/isOnline";
import { updateAccount, clearAccount } from "actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen";

import { updateActiveSheetName, resetActiveSheetName } from "actions/ui/excel/activeSheetName";

import { updateSheetCellValues, resetSheetCellValues } from "actions/ui/excel/sheetCellValues";

import { updateColumnCount, resetColumnCount } from "actions/ui/excel/columnCount";
import { updateRowCount, resetRowCount } from "actions/ui/excel/rowCount";

import { updateColumnWidths, resetColumnWidths } from "actions/ui/excel/columnWidths";
import { updateRowHeights, resetRowHeights } from "actions/ui/excel/rowHeights";

import { updateFreezeColumnCount, resetFreezeColumnCount } from "actions/ui/excel/freezeColumnCount";
import { updateFreezeRowCount, resetFreezeRowCount } from "actions/ui/excel/freezeRowCount";

import { updateSheetNames, resetSheetNames } from "actions/ui/excel/sheetNames";

import { setEditModeOff } from "actions/ui/excel/isEditMode";

import { resetSelectionArea } from "actions/ui/excel/selectionArea";


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
    sheetCellValues,
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
  dispatch(updateSheetCellValues(sheetCellValues));
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
  dispatch(resetSheetCellValues());
  dispatch(resetActiveSheetName());

  dispatch(resetColumnCount());
  dispatch(resetRowCount());

  dispatch(resetRowHeights());
  dispatch(resetColumnWidths());

  dispatch(resetFreezeColumnCount());
  dispatch(resetFreezeRowCount());

  dispatch(resetSheetNames());

  dispatch(setEditModeOff());

  dispatch(resetSelectionArea())
};