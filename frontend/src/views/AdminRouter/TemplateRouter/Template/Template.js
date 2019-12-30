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
  handleShowAppNavigation: () => dispatch(showAppNavigation()),
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
  match: { params: { _id } }, 
  history,
  handleExitTemplate, 
  handleLoadTemplate,
  handleHideAppNavigation, 
  handleShowAppNavigation
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(({ data: { data: { template } } }) => {
          let { fileStates, published } = template;
          fileStates.isTemplatePublished = published;
          fileStates.type = "template";
          fileStates.templateId = _id;

          handleLoadTemplate(convertStateToReactState(fileStates));
          if(isAppNavigationOpen) handleHideAppNavigation();
          setIsDataFetched(true);
        })
        .catch((error) => {
          console.error(error);
          if(!isAppNavigationOpen) handleShowAppNavigation();
          history.push(ROUTE_ADMIN_TEMPLATE_TEMPLATES);
        });
    }

    return () => {
      if(isDataFetched) handleExitTemplate(isAppNavigationOpen);
    };
  }, [ isDataFetched ]);

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          type="template"
          returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} 
        />
      : <Loading/>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;