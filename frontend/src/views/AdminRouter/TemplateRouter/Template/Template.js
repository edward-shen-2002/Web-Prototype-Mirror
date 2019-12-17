import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "tools/rest";
import { loadWorkbook, resetWorkbook } from "tools/redux";
import Excel from "tools/components/Excel";

import { convertStateToReactState } from "tools/excel";

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
  history,
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
          let { fileStates } = template;

          handleLoadTemplate(convertStateToReactState(fileStates));
          delete template.fileStates;
          setTemplate(template);
          setIsDataFetched(true);
        })
        .catch((error) => {
          console.error(error);
          history.push(ROUTE_ADMIN_TEMPLATE_TEMPLATES);
        });
    }

    return () => {
      if(isDataFetched) handleExitTemplate(isAppNavigationOpen);
    };
  }, [ isDataFetched ]);

  const handleUpdateTemplate = (newTemplate) => (
    adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${_id}`, { newTemplate })
      .then(() => {
        setTemplate({ ...template, ...newTemplate, fileStates: undefined });
      })
      .catch((error) => console.error(error))
  );

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          type="template"
          templateData={template}
          returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} 
          handleUpdateTemplate={handleUpdateTemplate}
        />
      : <Loading/>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;