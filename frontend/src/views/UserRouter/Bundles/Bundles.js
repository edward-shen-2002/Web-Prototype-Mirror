import React, { lazy, useState, useEffect } from "react";

import { connect } from "react-redux";

import LaunchIcon from "@material-ui/icons/Launch";

const MaterialTable = lazy(() => import("material-table"));

import {
  adminEditBundleRoleAxios,
  adminReviewBundleRoleAxios,
  adminApproveBundleRoleAxios
} from "tools/rest";

import {
  REST_ADMIN_EDIT_BUNDLES,
  REST_ADMIN_REVIEW_BUNDLES,
  REST_ADMIN_APPROVE_BUNDLES
} from "constants/rest";

import { ROLE_LEVEL_NOT_APPLICABLE } from "constants/roles";

import { ROUTE_USER_BUNDLES } from "constants/routes";

import "./Bundles.scss";

const mapStateToProps = ({
  domain: {
    account: {
      roles: {
        EDIT_BUNDLE_MANAGER,
        REVIEW_BUNDLE_MANAGER,
        APPROVE_BUNDLE_MANAGER
      }
    }
  }
}) => ({
  EDIT_BUNDLE_MANAGER,
  REVIEW_BUNDLE_MANAGER,
  APPROVE_BUNDLE_MANAGER
});

const mapDispatchToProps = (dispatch) => ({

});

const checkAndFetchRoleData = async (role, axiosRouter, route) => {
  let data = [];

  if(role.scope !== ROLE_LEVEL_NOT_APPLICABLE) {
    try {
      const { data: { data: { bundles } } } = await axiosRouter.get(route);
      data = bundles;
    } catch(error) {
      console.error(error);
    }
  }

  return data;
};

let Bundles = ({
  EDIT_BUNDLE_MANAGER,
  REVIEW_BUNDLE_MANAGER,
  APPROVE_BUNDLE_MANAGER,
  history
}) => {
  const [ bundles, setBundles ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      const fetchData = async () => {
        setBundles([
          ...(await checkAndFetchRoleData(EDIT_BUNDLE_MANAGER, adminEditBundleRoleAxios, REST_ADMIN_EDIT_BUNDLES)),
          ...(await checkAndFetchRoleData(REVIEW_BUNDLE_MANAGER, adminReviewBundleRoleAxios, REST_ADMIN_REVIEW_BUNDLES)),
          ...(await checkAndFetchRoleData(APPROVE_BUNDLE_MANAGER, adminApproveBundleRoleAxios, REST_ADMIN_APPROVE_BUNDLES))
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
    { title: "Organization", field: "organization" },
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