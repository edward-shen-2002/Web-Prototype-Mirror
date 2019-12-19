import React, { useState, useEffect } from "react";

import { publicAxios, adminBundleRoleAxios } from "tools/rest";

import Loading from "tools/components/Loading";

import { EntitiesContent } from "tools/components/EntitiesDialog";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import { REST_PUBLIC_DATA, REST_ADMIN_BUNDLES } from "constants/rest";
import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "constants/routes";

import "./Bundle.scss";

const NameField = ({ name }) => (
  <div className="field">
    <Typography className="field__label">Name: </Typography>
    <TextField className="field__input" value={name} fullWidth/>
  </div>
);

const BundleContent = ({
  name,
  templates,
  organizations,
  sectors,
  publicTemplates
}) => {
  return (
    <Paper className="bundlePage">
      <Typography className="bundlePage__title" variant="h4">Bundle Editor</Typography>
      <Divider/>
      <NameField name={name}/>
      <EntitiesContent
        userEntities={templates} 
        entities={publicTemplates} 
        userTitle="Current Templates"
        allTitle="Add Templates"
        userSearchPlaceholder="Search current templates..."
        allSearchPlaceholder="Search all templates..."
        // handleAddEntity={} 
        // handleDeleteUserEntity={}
      />
      {templates}
      {organizations}
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
  const [ publicTemplates, setPublicTemplates ] = useState([]);

  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      const fetchData = async () => {
        try {
          const bundleData = await adminBundleRoleAxios.get(`${REST_ADMIN_BUNDLES}/${_id}`);
          const templatesData = await publicAxios.get(`${REST_PUBLIC_DATA}/templates`);

          // ! Get publid template, organization, ... data
          const { data: { data: { templates: publicTemplates } } } = templatesData;

          const { data: { data: { bundle } } } = bundleData;
          const { name, templates, organizations, sectors } = bundle;

          setName(name);
          setTemplates(templates);
          setOrganizations(organizations);
          setSectors(sectors);
          setPublicTemplates(publicTemplates);

          setIsDataFetched(true);
        } catch(error) {
          console.error(error);
          history.push(ROUTE_ADMIN_BUNDLE_BUNDLES);
        }
      };

      fetchData();
    }
  }, [ isDataFetched ]);

  return (
    isDataFetched 
      ? <BundleContent
          name={name}
          templates={templates}
          publicTemplates={publicTemplates}
          organizations={organizations}
          sectors={sectors}
        />
      : <Loading/>
  );
};

export default Bundle;