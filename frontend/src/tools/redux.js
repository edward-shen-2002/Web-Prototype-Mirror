import { deleteAxiosToken, setAxiosToken } from "@tools/rest";
import { deleteToken, saveToken } from "@tools/storage";

import { setOnline, setOffline } from "@actions/app/isOnline";
import { updateAccount, resetAccount } from "@actions/domain/account";
import { showAppNavigation, hideAppNavigation } from "@actions/ui/isAppNavigationOpen";

import { updateWorkbookName, resetWorkbookName } from "@actions/ui/excel/name";
import { updateExcelType, resetExcelType } from "@actions/ui/excel/type";

import { updateActiveCellInputData, resetActiveCellInputData } from "@actions/ui/excel/activeCellInputData";
import { updateActiveSheetName, resetActiveSheetName } from "@actions/ui/excel/activeSheetName";
import { resetActiveSelectionArea } from "@actions/ui/excel/activeSelectionArea";
import { updateActiveCellPosition, resetActiveCellPosition } from "@actions/ui/excel/activeCellPosition";
import { resetActiveCellSelectionAreaIndex } from "@actions/ui/excel/activeCellSelectionAreaIndex";

import { updateSheetNames, resetSheetNames } from "@actions/ui/excel/sheetNames";
import { updateStagnantSelectionAreas, resetStagnantSelectionAreas } from "@actions/ui/excel/stagnantSelectionAreas";
import { resetScrollData } from "@actions/ui/excel/scrollData";

import { disableSelectionMode } from "@actions/ui/excel/isSelectionMode";
import { disableEditMode } from "@actions/ui/excel/isEditMode";

import { disableActiveCellInputAutoFocus } from "@actions/ui/excel/activeCellInputAutoFocus";

import { updateSheetCellData, resetSheetCellData } from "@actions/ui/excel/sheetCellData";
import { updateSheetColumnCount, resetSheetColumnCount } from "@actions/ui/excel/sheetColumnCount";
import { updateSheetRowCount, resetSheetRowCount } from "@actions/ui/excel/sheetRowCount";
import { updateSheetColumnWidths, resetSheetColumnWidths } from "@actions/ui/excel/sheetColumnWidths";
import { updateSheetRowHeights, resetSheetRowHeights } from "@actions/ui/excel/sheetRowHeights";
import { updateSheetFreezeColumnCount, resetSheetFreezeColumnCount } from "@actions/ui/excel/sheetFreezeColumnCount";
import { updateSheetFreezeRowCount, resetSheetFreezeRowCount } from "@actions/ui/excel/sheetFreezeRowCount";
import { updateSheetHiddenColumns, resetSheetHiddenColumns } from "@actions/ui/excel/sheetHiddenColumns";
import { updateSheetHiddenRows, resetSheetHiddenRows } from "@actions/ui/excel/sheetHiddenRows";

import { updateSheetTemplateIdMapping, resetSheetTemplateIdMapping } from "@actions/ui/excel/sheetTemplateIdMapping";
import { updatePublishTemplate, unpublishTemplate } from "@actions/ui/excel/isTemplatePublished";
import { updateTemplateId, resetTemplateId } from "@actions/ui/excel/templateId";

import { updateBundleId, resetBundleId } from "@actions/ui/excel/bundleId";

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

  dispatch(resetAccount());

  dispatch(hideAppNavigation());
};

export const loadSheet = (
  dispatch, 
  { 
    name,
    type,
    activeCellPosition,
    activeCellInputData,
    activeSheetName,

    templateId,

    sheetNames,
    
    sheetCellData,
    sheetColumnCount,
    sheetRowCount,
    sheetColumnWidths,
    sheetRowHeights,
    sheetFreezeColumnCount,
    sheetFreezeRowCount,
    sheetHiddenColumns,
    sheetHiddenRows,
    stagnantSelectionAreas,

    sheetTemplateIdMapping,
    isTemplatePublished,
    
    bundleId
  }
) => {
  if(name !== undefined) dispatch(updateWorkbookName(name));
  if(type !== undefined) dispatch(updateExcelType(type));
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

  if(sheetTemplateIdMapping) dispatch(updateSheetTemplateIdMapping(sheetTemplateIdMapping));
  if(isTemplatePublished !== undefined) dispatch(updatePublishTemplate(isTemplatePublished));
  if(templateId !== undefined) dispatch(updateTemplateId(templateId));
  if(bundleId !== undefined) dispatch(updateBundleId(bundleId));

  stagnantSelectionAreas ? dispatch(updateStagnantSelectionAreas(stagnantSelectionAreas)) : dispatch(resetStagnantSelectionAreas());

  dispatch(resetActiveSelectionArea());
  dispatch(disableEditMode());
};

export const resetSheet = (dispatch) => {
  dispatch(resetWorkbookName());
  dispatch(resetExcelType());
  
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

  dispatch(disableEditMode());

  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellPosition());
  dispatch(resetActiveCellSelectionAreaIndex());

  dispatch(disableSelectionMode());

  dispatch(resetStagnantSelectionAreas());
  dispatch(resetActiveSelectionArea());

  dispatch(resetActiveCellInputData());
  dispatch(resetScrollData());

  dispatch(disableActiveCellInputAutoFocus());

  dispatch(unpublishTemplate());
  dispatch(resetSheetTemplateIdMapping());

  dispatch(resetTemplateId());
  dispatch(resetBundleId());
  sessionStorage.removeItem("inactiveSheets");
};