import React, { useState, useEffect } from "react";

import { adminBundleRoleAxios } from "tools/rest";

import { REST_ADMIN_BUNDLES } from "constants/rest";
import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "constants/routes";

import Paper from "@material-ui/core/Paper";

import Loading from "tools/components/Loading";

import "./Bundle.scss";

const BundleContent = ({
  name,
  templates,
  organizations,
  sectors
}) => {

  return (
    <Paper>
      {name},
      {templates},
      {organizations},
      {sectors}
    </Paper>
  );
};

const Bundle = ({ 
  match: { params: { _id } }, 
  history
}) => {
  const [ name, setName ] = useState("");
  const [ templates, setTemplates ] = useState([]); 
  const [ organizations, setOrganizations ] = useState([]);
  const [ sectors, setSectors ] = useState([]);

  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminBundleRoleAxios.get(`${REST_ADMIN_BUNDLES}/${_id}`)
        .then(({ data: { data: { bundle } } }) => {
          const { name, templates, organizations, sectors } = bundle;
          setName(name);
          setTemplates(templates);
          setOrganizations(organizations);
          setSectors(sectors);
        })
        .catch((error) => {
          console.error(error);
          history.push(ROUTE_ADMIN_BUNDLE_BUNDLES);
        });
      setIsDataFetched(true);
    }
  }, [ isDataFetched ]);

  return (
    isDataFetched 
      ? <BundleContent
          name={name}
          templates={templates}
          organizations={organizations}
          sectors={sectors}
        />
      : <Loading/>
  );
};

export default Bundle;