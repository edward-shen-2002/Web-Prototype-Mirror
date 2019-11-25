import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "tools/rest";
import { loadWorkbook, resetWorkbook } from "tools/redux";
import Excel from "tools/components/Excel";

import XlsxPopulate from "xlsx-populate";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import Loading from "tools/components/Loading";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS,

  DEFAULT_EXCEL_ROW_HEIGHT,
  DEFAULT_EXCEL_COLUMN_WIDTH,

  DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN,
  DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN,
  
  DEFAULT_EXCEL_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_COLUMN_WIDTH_HEADER,

  DEFAULT_EXCEL_FREEZE_ROW_COUNT,
  DEFAULT_EXCEL_FREEZE_COLUMN_COUNT
} from "constants/excel";


import "./Template.scss";

// ! Xlsx populate workoook instance
let WorkbookInstance;

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
          
          WorkbookInstance = await XlsxPopulate.fromDataAsync(file, { base64: true });
          
          let freezeRowCount = DEFAULT_EXCEL_FREEZE_ROW_COUNT;
          let freezeColumnCount = DEFAULT_EXCEL_FREEZE_COLUMN_COUNT; 

          let columnCount = DEFAULT_EXCEL_COLUMNS + 1;
          let rowCount = DEFAULT_EXCEL_ROWS + 1;

          
          const sheetNames = WorkbookInstance.sheets().map((sheet) => sheet.name());
          const activeSheet = WorkbookInstance.activeSheet();
          const activeSheetName = activeSheet.name();
          
          const activeSheetUsedRange = activeSheet.usedRange();

          // ! Set columnCount / rowCount to be max of default and set values~
          if(activeSheetUsedRange) {
            const { _maxColumnNumber, _maxRowNumber } = activeSheetUsedRange;

            columnCount = _maxColumnNumber + 1;
            rowCount = _maxRowNumber + 1;
          }

          let sheetCellData = [];

          for(let row = 0; row <= DEFAULT_EXCEL_ROWS; row++) {
            let rowValues = [];
            for(let column = 0; column <= DEFAULT_EXCEL_COLUMNS; column++) {
              rowValues.push({
                value: row && column ? activeSheet.row(row).cell(column).value() : null
              });
            }

            sheetCellData.push(rowValues);
          }

          let columnWidths = [ DEFAULT_EXCEL_COLUMN_WIDTH_HEADER ];
          for(let column = 1; column <= DEFAULT_EXCEL_COLUMNS; column++) {
            let width;

            const sheetColumn = activeSheet.column(column);

            if(sheetColumn.hidden()) {
              width = DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN;
            } else {
              width = sheetColumn.width();
        
              if(!width) width = DEFAULT_EXCEL_COLUMN_WIDTH
            }

            columnWidths.push(width);
          }
          
          let rowHeights = [ DEFAULT_EXCEL_ROW_HEIGHT_HEADER ];

          for(let row = 1; row <= DEFAULT_EXCEL_ROWS; row++) {
            let height;
            const sheetRow = activeSheet.row(row);

            if(sheetRow.hidden()) {
              height = DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN;
            } else {
              height = sheetRow.height();
      
              if(!height) height = DEFAULT_EXCEL_ROW_HEIGHT;
            }

            rowHeights.push(height);
          }

          const panes = activeSheet.panes();
          
          if(panes && panes.state === "frozen") {
            freezeRowCount = panes.ySpit;
            freezeColumnCount = panes.xSplit;
          }

          // ! Test
          freezeColumnCount = 0;
          freezeRowCount = 3;
          
          handleLoadTemplate({
            sheetCellData,

            rowCount,
            columnCount,

            rowHeights,
            columnWidths,

            freezeColumnCount,
            freezeRowCount,
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

  return (
    isDataFetched 
      ? <Excel name={name} workbook={WorkbookInstance} returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} handleSubmitName={handleSubmitName}/>
      : <Loading/>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;