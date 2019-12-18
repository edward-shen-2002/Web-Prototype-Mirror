import React, { useState, useEffect, lazy } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AddFabIconButton } from "tools/components/buttons";

import TextField from "@material-ui/core/TextField";

import LaunchIcon from "@material-ui/icons/Launch";

import { adminBundleRoleAxios } from "tools/rest";
import { REST_ADMIN_BUNDLES } from "constants/rest";

import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "constants/routes";

const MaterialTable = lazy(() => import("material-table"));

import "./Bundles.scss";

const HeaderActions = ({ handleQueryChange, handleCreateBundle }) => (
  <div className="headerActions">
    <TextField className="headerActions__search" label="Search Bundles..." variant="outlined" type="search" onChange={handleQueryChange}/>
    <AddFabIconButton className="headerActions__button" title="Create" handleClick={handleCreateBundle}/>
  </div>
);

const Header = ({ handleQueryChange, handleCreateBundle }) => (
  <Paper className="header">
    <Typography variant="h5">Bundles</Typography>
    <HeaderActions handleQueryChange={handleQueryChange} handleCreateBundle={handleCreateBundle}/>
  </Paper>
);

const BundlesTable = ({ bundles, history }) => {
  const handleOpenBundle = (_event, bundle) => {
    history.push(`${ROUTE_ADMIN_BUNDLE_BUNDLES}/${bundle._id}`);
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Creation Date", field: "createdAt", type: "date" }
  ];

  const actions = [
    { icon: LaunchIcon, tooltip: "Open Bundle", onClick: handleOpenBundle }
  ];

  const options = { actionsColumnIndex: -1, search: false, showTitle: false };

  return (
    <MaterialTable 
      columns={columns} 
      actions={actions} 
      data={bundles} 
      options={options}
    />
  );
};

// TODO : Add other views in the future
const BundlesContent = ({ bundles, isTableView, history }) => (
  <BundlesTable bundles={bundles} history={history}/>
);

const BundlesContainer = ({ history }) => {
  const [ query, setQuery ] = useState("");
  const [ bundles, setBundles ] = useState([]);
  const [ isDateFetched, setIsDataFetched ] = useState(false);
  const [ isTableView, setIsTableView ] = useState(true);

  useEffect(() => {
    if(!isDateFetched) { 
      adminBundleRoleAxios.get(REST_ADMIN_BUNDLES)
        .then(({ data: { data: { bundles } } }) => {
          setBundles(bundles);
        })
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    } 
  }, [ isDateFetched ]);

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const filteredBundles = bundles.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

  const handleCreateBundle = () => {
    adminBundleRoleAxios.post(REST_ADMIN_BUNDLES)
      .then(({ data: { data: { bundle } } }) => {
          history.push(`${ROUTE_ADMIN_BUNDLE_BUNDLES}/${bundle._id}`);
        })
        .catch((error) => console.error(error));
  };

  return (
    <div>
      <Header 
        handleQueryChange={handleQueryChange} 
        handleCreateBundle={handleCreateBundle}
      />
      <BundlesContent 
        bundles={filteredBundles} 
        isTableView={isTableView} 
        history={history} 
      />
    </div>
  );
};

const Bundles = (props) => (
  <div className="bundlesPage">
    <BundlesContainer {...props}/>
  </div>
);

export default Bundles;