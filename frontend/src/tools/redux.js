import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

import { setOnline, setOffline } from "actions/app/isOnline";
import { updateAccount, clearAccount } from "actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen";


import { resetActiveCellInputValue } from "actions/ui/excel/activeCellInputValue";
import { updateActiveSheetName, resetActiveSheetName } from "actions/ui/excel/activeSheetName";
import { resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { resetActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { updateSheetNames, resetSheetNames } from "actions/ui/excel/sheetNames";
import { resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";

import { setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOff } from "actions/ui/excel/isEditMode";

import { updateSheetsCellData, resetSheetsCellData } from "actions/ui/excel/sheetsCellData";
import { updateSheetsColumnCount, resetSheetsColumnCount } from "actions/ui/excel/sheetsColumnCount";
import { updateSheetsRowCount, resetSheetsRowCount } from "actions/ui/excel/sheetsRowCount";
import { updateSheetsColumnWidths, resetSheetsColumnWidths } from "actions/ui/excel/sheetsColumnWidths";
import { updateSheetsRowHeights, resetSheetsRowHeights } from "actions/ui/excel/sheetsRowHeights";
import { updateSheetsFreezeColumnCount, resetSheetsFreezeColumnCount } from "actions/ui/excel/sheetsFreezeColumnCount";
import { updateSheetsFreezeRowCount, resetSheetsFreezeRowCount } from "actions/ui/excel/sheetsFreezeRowCount";


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
    activeSheetName,
    
    sheetsCellData,
    sheetsColumnCount,
    sheetsRowCount,

    sheetsColumnWidths,
    sheetsRowHeights,
    
    sheetsFreezeColumnCount,
    sheetsFreezeRowCount,

    sheetNames
  }
) => {
  dispatch(updateSheetsCellData(sheetsCellData));
  dispatch(updateActiveSheetName(activeSheetName));

  dispatch(updateSheetsColumnCount(sheetsColumnCount));
  dispatch(updateSheetsRowCount(sheetsRowCount));

  dispatch(updateSheetsColumnWidths(sheetsColumnWidths));
  dispatch(updateSheetsRowHeights(sheetsRowHeights));

  dispatch(updateSheetsFreezeColumnCount(sheetsFreezeColumnCount));
  dispatch(updateSheetsFreezeRowCount(sheetsFreezeRowCount));

  dispatch(updateSheetNames(sheetNames));
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

  dispatch(resetActiveCellInputValue());
};