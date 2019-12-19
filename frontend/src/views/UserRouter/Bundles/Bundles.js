import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";

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
  APPROVE_BUNDLE_MANAGER
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

  return (
    <Paper className="bundles">
      BUUUUUUUUUNDLES
    </Paper>
  );
};

Bundles = connect(mapStateToProps, mapDispatchToProps)(Bundles);

export default Bundles;