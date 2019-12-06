import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import XlsxPopulate, { RichText, Range } from "xlsx-populate";

import { adminTemplateRoleAxios } from "tools/rest";
import { loadWorkbook, resetWorkbook } from "tools/redux";
import Excel from "tools/components/Excel";

import { getHeaderCount, getColumnsData, getRowsData, getSheetCellData, getFreezeHeader, convertRichTextToEditorState, convertTextToEditorState } from "tools/excel";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import { DEFAULT_EXCEL_SHEET_ROW_COUNT, DEFAULT_EXCEL_SHEET_COLUMN_COUNT } from "constants/excel";

import Loading from "tools/components/Loading";

import "./Template.scss";

const mapStateToProps = ({ ui: { isAppNavigationOpen } }) => ({ isAppNavigationOpen });

const mapDispatchToProps = (dispatch) => ({
  handleHideAppNavigation: () => dispatch(hideAppNavigation()),
  handleExitTemplate: (isAppNavigationOpen) => {
    if(!isAppNavigationOpen) dispatch(showAppNavigation());
    resetWorkbook(dispatch);
  },
  handleLoadTemplate: (excelData) => {
    loadWorkbook(dispatch, excelData);
  }
});

let Template = ({ 
  isAppNavigationOpen, 
  handleHideAppNavigation, 
  match: { params: { _id } }, 
  handleExitTemplate, 
  handleLoadTemplate
}) => {
  const [ template, setTemplate ] = useState({});
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  const { name } = template;

  if(isAppNavigationOpen) handleHideAppNavigation();

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(async ({ data: { data: { template } } }) => {
          const { file } = template;
          
          const WorkbookInstance = await XlsxPopulate.fromDataAsync(file, { base64: true });
          
          const sheetNames = WorkbookInstance.sheets().map((sheet) => sheet.name());

          const activeSheet = WorkbookInstance.activeSheet();
          const activeSheetName = activeSheet.name();

          let sheetsColumnCount = {};
          let sheetsColumnWidths = {};
          let sheetsFreezeColumnCount = {};
          let sheetsRowCount = {};
          let sheetsRowHeights = {};
          let sheetsFreezeRowCount = {};
          let sheetsCellData = {};
          let sheetsHiddenColumns = {};
          let sheetsHiddenRows = {};

          sheetNames.forEach((name) => {
            const sheet = WorkbookInstance.sheet(name);

            let { columnCount, rowCount } = getHeaderCount(sheet);

            columnCount = Math.max(columnCount, DEFAULT_EXCEL_SHEET_COLUMN_COUNT + 1);
            rowCount = Math.max(rowCount, DEFAULT_EXCEL_SHEET_ROW_COUNT + 1);

            let sheetCellData = getSheetCellData(sheet, columnCount, rowCount);
            let { columnWidths, hiddenColumns } = getColumnsData(sheet, columnCount);
            let { rowHeights, hiddenRows } = getRowsData(sheet, rowCount);
            let { freezeRowCount, freezeColumnCount } = getFreezeHeader(sheet);

            sheetsColumnCount[name] = columnCount;
            sheetsRowCount[name] = rowCount;
            sheetsCellData[name] = sheetCellData;

            sheetsColumnWidths[name] = columnWidths;
            sheetsRowHeights[name] = rowHeights;
            sheetsFreezeRowCount[name] = freezeRowCount;
            sheetsFreezeColumnCount[name] = freezeColumnCount;
            sheetsHiddenColumns[name] = hiddenColumns;
            sheetsHiddenRows[name] = hiddenRows;
          });

          let activeCell = activeSheet.activeCell();
          let activeRow;
          let activeColumn;

          if(activeCell instanceof Range) {
            activeRow = activeCell._minRowNumber;
            activeColumn = activeCell._minColumnNumber;
          } else {
            activeRow = activeCell.rowNumber();
            activeColumn = activeCell.columnNumber();
          }

          let activeCellPosition = { x: activeColumn, y: activeRow };

          const activeCellInputValueData = (
            sheetsCellData[activeSheetName] && sheetsCellData[activeSheetName][activeRow] && sheetsCellData[activeSheetName][activeRow][activeColumn]
              ? sheetsCellData[activeSheetName][activeRow][activeColumn].value
              : ""
          );

          let activeCellInputData = (
            activeCellInputValueData instanceof RichText 
              ? { editorState: convertRichTextToEditorState(activeCellInputValueData) }
              : { editorState: convertTextToEditorState(activeCellInputValueData) }
          );

          handleLoadTemplate({
            activeCellPosition,
            activeCellInputData,

            sheetsCellData,

            sheetsColumnCount,
            sheetsColumnWidths,
            sheetsFreezeColumnCount,
            sheetsRowCount,
            sheetsFreezeRowCount,
            sheetsRowHeights,
            sheetsHiddenColumns,
            sheetsHiddenRows,

            activeSheetName,
            sheetNames
          });

          setTemplate(template);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsDataFetched(true));
    }

    return () => {
      if(isDataFetched) handleExitTemplate(isAppNavigationOpen);
    };
  }, [ isDataFetched ]);

  const handleSubmitName = (name) => {
    const newTemplate = { name };
    return (
      adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${_id}`, { newTemplate })
        .then(() => {
          setTemplate({ ...template, ...newTemplate });
        })
        .catch((error) => console.error(error))
    );
  };

  const handleSaveWorkbook = (file) => {
    const newTemplate = { file };

    return (
      adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${_id}`, { newTemplate })
        .then(() => {
          setTemplate({ ...template, ...newTemplate });
        })
        .catch((error) => console.error(error))
    );
  };

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} 
          handleSubmitName={handleSubmitName}
          handleSaveWorkbook={handleSaveWorkbook}
        />
      : <Loading/>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;