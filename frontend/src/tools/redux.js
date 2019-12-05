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

import { updateSheetsCellData, resetSheetsCellData } from "actions/ui/excel/sheetsCellData";
import { updateSheetsColumnCount, resetSheetsColumnCount } from "actions/ui/excel/sheetsColumnCount";
import { updateSheetsRowCount, resetSheetsRowCount } from "actions/ui/excel/sheetsRowCount";
import { updateSheetsColumnWidths, resetSheetsColumnWidths } from "actions/ui/excel/sheetsColumnWidths";
import { updateSheetsRowHeights, resetSheetsRowHeights } from "actions/ui/excel/sheetsRowHeights";
import { updateSheetsFreezeColumnCount, resetSheetsFreezeColumnCount } from "actions/ui/excel/sheetsFreezeColumnCount";
import { updateSheetsFreezeRowCount, resetSheetsFreezeRowCount } from "actions/ui/excel/sheetsFreezeRowCount";
import { updateSheetsHiddenColumns, resetSheetsHiddenColumns } from "actions/ui/excel/sheetsHiddenColumns";
import { updateSheetsHiddenRows, resetSheetsHiddenRows } from "actions/ui/excel/sheetsHiddenRows";

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
    
    sheetsCellData,
    sheetsColumnCount,
    sheetsRowCount,
    sheetsColumnWidths,
    sheetsRowHeights,
    sheetsFreezeColumnCount,
    sheetsFreezeRowCount,
    sheetsHiddenColumns,
    sheetsHiddenRows
  }
) => {
  dispatch(updateActiveCellInputData(activeCellInputData));
  dispatch(updateActiveCellPosition(activeCellPosition));
  dispatch(updateActiveSheetName(activeSheetName));
  dispatch(updateSheetNames(sheetNames));
  
  dispatch(updateSheetsCellData(sheetsCellData));
  dispatch(updateSheetsColumnCount(sheetsColumnCount));
  dispatch(updateSheetsRowCount(sheetsRowCount));

  dispatch(updateSheetsColumnWidths(sheetsColumnWidths));
  dispatch(updateSheetsRowHeights(sheetsRowHeights));

  dispatch(updateSheetsFreezeColumnCount(sheetsFreezeColumnCount));
  dispatch(updateSheetsFreezeRowCount(sheetsFreezeRowCount));

  dispatch(updateSheetsHiddenColumns(sheetsHiddenColumns));
  dispatch(updateSheetsHiddenRows(sheetsHiddenRows));
};

export const resetWorkbook = (dispatch) => {
  dispatch(resetSheetsCellData());
  dispatch(resetActiveSheetName());

  dispatch(resetSheetsColumnCount());
  dispatch(resetSheetsRowCount());

  dispatch(resetSheetsRowHeights());
  dispatch(resetSheetsColumnWidths());
  
  dispatch(resetSheetsFreezeColumnCount());
  dispatch(resetSheetsFreezeRowCount());

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

  dispatch(resetSheetsHiddenColumns());
  dispatch(resetSheetsHiddenRows());
};