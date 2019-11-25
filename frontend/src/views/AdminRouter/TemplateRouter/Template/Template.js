import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "tools/rest";
import { loadWorkbook, resetWorkbook } from "tools/redux";
import Excel from "tools/components/Excel";

import { getHeaderCount, getColumnWidths, getRowHeights, getSheetData, getFreezeHeader } from "./tools";

import XlsxPopulate from "xlsx-populate";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

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

          // ! Set columnCount / rowCount to be max of default and set values~
          let { columnCount, rowCount } = getHeaderCount(activeSheet);

          let sheetCellData = getSheetData(activeSheet);

          let columnWidths = getColumnWidths(activeSheet);
          
          let rowHeights = getRowHeights(activeSheet);

          let { freezeRowCount, freezeColumnCount } = getFreezeHeader(activeSheet);

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
      ? <Excel name={name} returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} handleSubmitName={handleSubmitName}/>
      : <Loading/>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;