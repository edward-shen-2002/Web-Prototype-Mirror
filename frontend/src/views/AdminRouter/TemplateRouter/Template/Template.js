import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "tools/rest";
import Excel from "tools/components/Excel";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

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

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(({ data: { data: { template } } }) => {
          setTemplate(template);
        })
        .catch((error) => console.error(error));

      handleHideAppNavigation(isAppNavigationOpen);
      setIsDataFetched(true);
    }

    return () => handleShowAppNavigation(isAppNavigationOpen);
  }, [ isDataFetched ]);

  const { name } = template;

  return (
    <div>
      <Excel name={name} homeLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES}/>
    </div>
  );
};

Template = connect(mapStateToProps, mapDispatchToProps)(Template);

export default Template;