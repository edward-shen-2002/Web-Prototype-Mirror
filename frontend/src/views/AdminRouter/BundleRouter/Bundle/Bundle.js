import React, { useState, useEffect } from "react";

import { publicAxios, adminBundleRoleAxios } from "tools/rest";

import Loading from "tools/components/Loading";

import Select from "react-select";

import { EntitiesContent } from "tools/components/EntitiesDialog";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import { REST_PUBLIC_DATA, REST_ADMIN_BUNDLES } from "constants/rest";
import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "constants/routes";

import "./Bundle.scss";

const EditorActions = () => (
  <ButtonGroup className="bundleActions" fullWidth>
    <Button>Save</Button>
    <Button>Publish</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
);

const BundleTextField = ({ label, text, handleChange }) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <TextField className="field__input" value={text} onChange={handleChange} fullWidth/>
  </div>
);

const BundleSelectField = ({ label, items, handleChange }) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <Select className="field__select" options={items}/>
  </div>
);

const BundleContent = ({
  name,
  year,
  quarter,
  templates,
  organizations,
  sectors,
  publicTemplates,
  publicOrganizations,
  publicSectors,
  setName,
  setTemplates,
  setOrganizations,
  setSectors
}) => {
  const handleChangeName = ({ target: { value } }) => setName(value);

  const handleAddTemplate = (newTemplate) => {

  };

  const handleDeleteTemplate = (template) => {

  };

  const handleAddSector = () => {

  };

  const handleDeleteSector = () => {

  };

  const handleAddOrganization = () => {

  };

  const handleDeleteOrganization = () => {

  };

  const currentQuarter = { label: quarter, value: quarter };

  let quarters = [];

  for(let i = 1; i < 5; i++) quarters.push({ label: i, value: i });

  const entityStyles = {
    marginTop: 20,
    padding: 20,
    border: "1px solid lightgray",
    borderRadius: 3
  };

  return (
    <Paper className="bundlePage">
      <Typography className="bundlePage__title" variant="h4">Bundle Editor</Typography>
      <Divider/>
      <BundleTextField label="Name" text={name} handleChange={handleChangeName}/>
      <BundleTextField label="Year" text={year}/>
      <BundleSelectField label="Quarter" value={currentQuarter} items={quarters}/>
      <EntitiesContent
        style={entityStyles}
        userEntities={templates} 
        entities={publicTemplates} 
        userTitle="Current Templates"
        allTitle="Add Templates"
        userSearchPlaceholder="Search current templates..."
        allSearchPlaceholder="Search all templates..."
        handleAddEntity={handleAddTemplate} 
        handleDeleteUserEntity={handleDeleteTemplate}
      />
      <EntitiesContent
        style={entityStyles}
        userEntities={organizations} 
        entities={publicOrganizations} 
        userTitle="Current Organizations"
        allTitle="Add Organizations"
        userSearchPlaceholder="Search current organizations..."
        allSearchPlaceholder="Search all organizations..."
        handleAddEntity={handleAddOrganization} 
        handleDeleteUserEntity={handleDeleteOrganization}
      />
      <EntitiesContent
        style={entityStyles}
        userEntities={sectors} 
        entities={publicSectors} 
        userTitle="Current Sectors"
        allTitle="Add Sectors"
        userSearchPlaceholder="Search current sectors..."
        allSearchPlaceholder="Search all sectors..."
        handleAddEntity={handleAddSector} 
        handleDeleteUserEntity={handleDeleteSector}
      />
      <EditorActions/>
    </Paper>
  );
};

const Bundle = ({ 
  match: { params: { _id } }, 
  history
}) => {
  const [ name, setName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ quarter, setQuarter ] = useState("");
  const [ templates, setTemplates ] = useState([]); 
  const [ organizations, setOrganizations ] = useState([]);
  const [ sectors, setSectors ] = useState([]);
  const [ publicTemplates, setPublicTemplates ] = useState([]);
  const [ publicOrganizations, setPublicOrganizations ] = useState([]);
  const [ publicSectors, setPublicSectors ] = useState([]);

  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      const fetchData = async () => {
        try {
          const bundleData = await adminBundleRoleAxios.get(`${REST_ADMIN_BUNDLES}/${_id}`);
          const templatesData = await publicAxios.get(`${REST_PUBLIC_DATA}/templates`);
          const organizationsData = await publicAxios.get(`${REST_PUBLIC_DATA}/organizations`);
          const sectorsData = await publicAxios.get(`${REST_PUBLIC_DATA}/sectors`);

          // ! Get publid template, organization, ... data
          const { data: { data: { templates: publicTemplates } } } = templatesData;
          const { data: { data: { organizations: publicOrganizations } } } = organizationsData;
          const { data: { data: { sectors: publicSectors } } } = sectorsData; 

          const { data: { data: { bundle } } } = bundleData;
          const { name, templates, organizations, sectors, quarter, year } = bundle;

          setName(name);
          setYear(year);
          setQuarter(quarter);
          setTemplates(templates);
          setOrganizations(organizations);
          setSectors(sectors);
          setPublicTemplates(publicTemplates);
          setPublicOrganizations(publicOrganizations);
          setPublicSectors(publicSectors);

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
          year={year}
          quarter={quarter}
          templates={templates}
          publicTemplates={publicTemplates}
          publicOrganizations={publicOrganizations}
          publicSectors={publicSectors}
          organizations={organizations}
          sectors={sectors}
          setName={setName}
          setTemplates={setTemplates}
          setOrganizations={setOrganizations}
          setSectors={setSectors}
        />
      : <Loading/>
  );
};

export default Bundle;