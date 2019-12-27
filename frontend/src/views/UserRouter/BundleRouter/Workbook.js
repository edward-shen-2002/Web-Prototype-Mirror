import React, { useState, useEffect, useMemo } from "react";

import { connect } from "react-redux";
import { showAppNavigation, hideAppNavigation } from "actions/ui/isAppNavigationOpen"; 

import { loadWorkbook, resetWorkbook } from "tools/redux";
import Excel from "tools/components/Excel";

import { convertStateToReactState } from "tools/excel";
import { 
  adminEditBundleRoleAxios, 
  adminReviewBundleRoleAxios, 
  adminApproveBundleRoleAxios,
  adminBundleRoleAxios
} from "tools/rest";

import { REST_ADMIN_BUNDLES_WORKFLOW } from "constants/rest";
import { ROUTE_USER_BUNDLES } from "constants/routes"

import Loading from "tools/components/Loading";

const mapStateToProps = ({
  ui: {
    isAppNavigationOpen
  }
}) => ({
  isAppNavigationOpen
});

const mapDispatchToProps = (dispatch) => ({
  handleHideAppNavigation: () => dispatch(hideAppNavigation()),
  handleExitWorkbook: (isAppNavigationOpen) => {
    if(!isAppNavigationOpen) dispatch(showAppNavigation());
    resetWorkbook(dispatch);
  },
  handleLoadWorkbook: (excelData) => {
    loadWorkbook(dispatch, excelData);
  }
});

let Workbook = ({
  match: {
    params: {
      phase, 
      bundleId, 
      workbookId 
    } 
  },
  isAppNavigationOpen,
  handleHideAppNavigation,
  handleLoadWorkbook,
  handleExitWorkbook,
  history
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  if(isAppNavigationOpen) handleHideAppNavigation();

  const returnLink = `${ROUTE_USER_BUNDLES}/${phase}/${bundleId}`;

  const bundlePhaseRoleAxios = useMemo(() => {
    if(phase === "edit") {
      return adminEditBundleRoleAxios;
    } else if(phase === "review") {
      return adminReviewBundleRoleAxios;
    } else if(phase === "approve") {
      return adminApproveBundleRoleAxios;
    }

    return adminBundleRoleAxios;
  }, [ phase ]);

  useEffect(() => {
    if(!isDataFetched) {
      bundlePhaseRoleAxios.get(`${REST_ADMIN_BUNDLES_WORKFLOW}/${bundleId}/workbook/${workbookId}`)
        .then(({ data: { data: { workbook } } }) => {
          let { fileStates } = workbook;

          handleLoadWorkbook(convertStateToReactState(fileStates));
          setIsDataFetched(true);
        })
        .catch((error) => {
          console.error(error);
          history.push(returnLink);
        });
    }

    return () => {
      if(isDataFetched) handleExitWorkbook(isAppNavigationOpen);
    };
  }, [ isDataFetched ]);

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          returnLink={returnLink}
          type={phase}
        />
      : <Loading/>
  );
};

Workbook = connect(mapStateToProps, mapDispatchToProps)(Workbook);

export default Workbook;