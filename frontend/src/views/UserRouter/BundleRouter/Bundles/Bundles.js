import React, { lazy, useState, useEffect } from "react";

import { connect } from "react-redux";

import LaunchIcon from "@material-ui/icons/Launch";

const MaterialTable = lazy(() => import("material-table"));

import {
  adminEditBundleRoleAxios,
  adminReviewBundleRoleAxios,
  adminApproveBundleRoleAxios,
  adminBundleRoleAxios
} from "tools/rest";

import { REST_ADMIN_BUNDLES_WORKFLOW } from "constants/rest";

import { ROLE_LEVEL_NOT_APPLICABLE } from "constants/roles";

import { ROUTE_USER_BUNDLES } from "constants/routes";

import "./Bundles.scss";

const mapStateToProps = ({
  domain: {
    account: {
      roles: {
        EDIT_BUNDLE_MANAGER,
        REVIEW_BUNDLE_MANAGER,
        APPROVE_BUNDLE_MANAGER,
        BUNDLE_MANAGER
      }
    }
  }
}) => ({
  EDIT_BUNDLE_MANAGER,
  REVIEW_BUNDLE_MANAGER,
  APPROVE_BUNDLE_MANAGER,
  BUNDLE_MANAGER
});

const mapDispatchToProps = (dispatch) => ({

});

const checkAndFetchRoleData = async (role, axiosRouter) => {
  let data = [];

  if(role.scope !== ROLE_LEVEL_NOT_APPLICABLE) {
    try {
      const { data: { data: { bundles } } } = await axiosRouter.get(`${REST_ADMIN_BUNDLES_WORKFLOW}/general`);
      data = bundles;
    } catch(error) {
      // Not actually an error
    }
  }

  return data;
};

let Bundles = ({
  EDIT_BUNDLE_MANAGER,
  REVIEW_BUNDLE_MANAGER,
  APPROVE_BUNDLE_MANAGER,
  BUNDLE_MANAGER,
  history
}) => {
  const [ bundles, setBundles ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      const fetchData = async () => {
        setBundles([
          ...(await checkAndFetchRoleData(EDIT_BUNDLE_MANAGER, adminEditBundleRoleAxios)),
          ...(await checkAndFetchRoleData(REVIEW_BUNDLE_MANAGER, adminReviewBundleRoleAxios)),
          ...(await checkAndFetchRoleData(APPROVE_BUNDLE_MANAGER, adminApproveBundleRoleAxios)),
          ...(await checkAndFetchRoleData(BUNDLE_MANAGER, adminBundleRoleAxios))
        ]);
      };
      fetchData();
      setIsDataFetched(true);
    }
  });
  
  const handleOpenBundle = (_event, { _id, phase }) => history.push(`${ROUTE_USER_BUNDLES}/${phase}/${_id}`);

  const actions = [
    { icon: LaunchIcon, tooltip: "Open Bundle", onClick: handleOpenBundle }
  ];

  const options = { actionsColumnIndex: -1 };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Organization", field: "organization.name" },
    { title: "Status", field: "status" },
    { title: "Phase", field: "phase" }
  ];

  return (
    <div className="bundles">
      <MaterialTable 
        className="bundles__table" 
        title="Bundles" 
        columns={columns} 
        actions={actions} 
        data={bundles} 
        options={options}
      />
    </div>
  );
};

Bundles = connect(mapStateToProps, mapDispatchToProps)(Bundles);

export default Bundles;