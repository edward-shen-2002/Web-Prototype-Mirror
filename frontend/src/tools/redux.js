import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

import { setOnline, setOffline } from "actions/app/isOnline";
import { updateAccount, clearAccount } from "actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen";

import { updateActiveCellInputValue, resetActiveCellInputValue } from "actions/ui/excel/activeCellInputValue";
import { updateActiveSheetName, resetActiveSheetName } from "actions/ui/excel/activeSheetName";
import { resetActiveSelectionArea } from "actions/ui/excel/activeSelectionArea";
import { updateActiveCellPosition, resetActiveCellPosition } from "actions/ui/excel/activeCellPosition";
import { resetActiveCellSelectionAreaIndex } from "actions/ui/excel/activeCellSelectionAreaIndex";

import { updateSheetNames, resetSheetNames } from "actions/ui/excel/sheetNames";
import { resetStagnantSelectionAreas } from "actions/ui/excel/stagnantSelectionAreas";
import { resetScrollData } from "actions/ui/excel/scrollData";

import { setSelectionModeOff } from "actions/ui/excel/isSelectionMode";
import { setEditModeOff } from "actions/ui/excel/isEditMode";

import { updateSheetsCellData, resetSheetsCellData } from "actions/ui/excel/sheetsCellData";
import { updateSheetsColumnCount, resetSheetsColumnCount } from "actions/ui/excel/sheetsColumnCount";
import { updateSheetsRowCount, resetSheetsRowCount } from "actions/ui/excel/sheetsRowCount";
import { updateSheetsColumnWidthsData, resetSheetsColumnWidthsData } from "actions/ui/excel/sheetsColumnWidthsData";
import { updateSheetsRowHeightsData, resetSheetsRowHeightsData } from "actions/ui/excel/sheetsRowHeightsData";
import { updateSheetsFreezeColumnCount, resetSheetsFreezeColumnCount } from "actions/ui/excel/sheetsFreezeColumnCount";
import { updateSheetsFreezeRowCount, resetSheetsFreezeRowCount } from "actions/ui/excel/sheetsFreezeRowCount";
import { updateSheetsCellOffsets, resetSheetsCellOffsets } from "actions/ui/excel/sheetsCellOffsets";


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
    activeCellInputValue,
    activeSheetName,

    sheetNames,
    
    sheetsCellData,
    sheetsColumnCount,
    sheetsRowCount,
    sheetsColumnWidths,
    sheetsRowHeights,
    sheetsFreezeColumnCount,
    sheetsFreezeRowCount,
    sheetsCellOffsets
  }
) => {
  dispatch(updateActiveCellInputValue(activeCellInputValue));
  dispatch(updateActiveCellPosition(activeCellPosition));
  dispatch(updateActiveSheetName(activeSheetName));
  dispatch(updateSheetNames(sheetNames));
  
  dispatch(updateSheetsCellData(sheetsCellData));
  dispatch(updateSheetsColumnCount(sheetsColumnCount));
  dispatch(updateSheetsRowCount(sheetsRowCount));

  dispatch(updateSheetsColumnWidthsData(sheetsColumnWidths));
  dispatch(updateSheetsRowHeightsData(sheetsRowHeights));

  dispatch(updateSheetsFreezeColumnCount(sheetsFreezeColumnCount));
  dispatch(updateSheetsFreezeRowCount(sheetsFreezeRowCount));
  dispatch(updateSheetsCellOffsets(sheetsCellOffsets));
};

export const resetWorkbook = (dispatch) => {
  dispatch(resetSheetsCellData());
  dispatch(resetActiveSheetName());

  dispatch(resetSheetsColumnCount());
  dispatch(resetSheetsRowCount());

  dispatch(resetSheetsRowHeightsData());
  dispatch(resetSheetsColumnWidthsData());
  
  dispatch(resetSheetsFreezeColumnCount());
  dispatch(resetSheetsFreezeRowCount());
  dispatch(resetSheetsCellOffsets());

  dispatch(resetSheetNames());

  dispatch(setEditModeOff());

  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellPosition());
  dispatch(resetActiveCellSelectionAreaIndex());

  dispatch(setSelectionModeOff());

  dispatch(resetStagnantSelectionAreas());
  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellInputValue());
  dispatch(resetScrollData());
};