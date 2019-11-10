import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "tools/rest";
import Excel from "tools/components/Excel";

import XlsxPopulate from "xlsx-populate";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import Loading from "tools/components/Loading";

import "./Template.scss";

const mapStateToProps = ({ ui: { isAppNavigationOpen } }) => ({ isAppNavigationOpen });

const mapDispatchToProps = (dispatch) => ({
  handleHideAppNavigation: (isAppNavigationOpen) => {
    if(isAppNavigationOpen) dispatch(hideAppNavigation());
  },
  handleShowAppNavigation: (isAppNavigationOpen) => {
    if(!isAppNavigationOpen) dispatch(showAppNavigation());
  }
});

let Template = ({ handleHideAppNavigation, handleShowAppNavigation, isAppNavigationOpen, match: { params: { _id } } }) => {
  const [ template, setTemplate ] = useState({});
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ workbook, setWorkbook ] = useState(null);

  if(isAppNavigationOpen) handleHideAppNavigation(isAppNavigationOpen);

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(async ({ data: { data: { template } } }) => {
          const { file } = template;

          const workbook = await XlsxPopulate.fromDataAsync(file, { base64: true });

          setWorkbook(workbook);
          setTemplate(template);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsDataFetched(true));
    }

    return () => handleShowAppNavigation(isAppNavigationOpen);
  }, [ isDataFetched ]);

  const { name } = template;

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
      ? <Excel name={name} workbook={workbook} returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES} handleSubmitName={handleSubmitName}/>
      : <Loading/>
  )
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;