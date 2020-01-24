import React, { useState, useEffect } from "react";

import { publicAxios, adminBundleRoleAxios } from "@tools/rest";

import Select from "react-select";

import Loading from "@tools/components/Loading";
import TextDialog from "@tools/components/TextDialog";
import { EntitiesContent, deleteItemAndGetUpdatedList, addItemAndGetUpdatedList } from "@tools/components/EntitiesDialog";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import { REST_PUBLIC_DATA, REST_ADMIN_BUNDLES } from "@constants/rest";
import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "@constants/routes";

import "./Bundle.scss";

const EditorActions = ({
  handleSave,
  handlePublish,
  handleCancel
}) => (
  <ButtonGroup className="bundleActions" fullWidth>
    <Button variant="contained" onClick={handleSave}>Save</Button>
    <Button variant="contained" color="primary" onClick={handlePublish}>Publish</Button>
    <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
  </ButtonGroup>
);

const BundleTextField = ({ label, text, textFieldProps, handleChange }) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <TextField className="field__input" value={text} onChange={handleChange} {...textFieldProps} fullWidth/>
  </div>
);

const BundleSelectField = ({ label, options, value, handleChange }) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <Select className="field__select" options={options} value={value} onChange={handleChange}/>
  </div>
);

const BundleHeader = ({ handleOpenDeleteWarningDialog }) => (
  <div className="bundleHeader">
    <Typography variant="h4">Bundle Editor</Typography>
    <Button variant="contained" color="secondary" onClick={handleOpenDeleteWarningDialog}>Delete Bundle</Button>
  </div>
);

const BundleContent = ({
  _id,
  name,
  type,
  year,
  quarter,
  templates,
  organizations,
  sectors,
  publicTemplates,
  publicOrganizations,
  publicSectors,
  setName,
  setType,
  setTemplates,
  setOrganizations,
  setSectors,
  setQuarter,
  setYear,
  history
}) => {
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  const handleChangeName = ({ target: { value } }) => setName(value);

  const handleChangeType = ({ target: { value } }) => setType(value);

  const handleChangeYear = ({ target: { value } }) => setYear(value);

  const handleChangeQuarter = ({ value }) => setQuarter(value);

  const handleAddTemplate = (newTemplate) => setTemplates(addItemAndGetUpdatedList(templates, newTemplate));

  const handleDeleteTemplate = (template) => setTemplates(deleteItemAndGetUpdatedList(templates, template));

  const handleAddSector = (newSector) => setSectors(addItemAndGetUpdatedList(sectors, newSector));

  const handleDeleteSector = (sector) => setSectors(deleteItemAndGetUpdatedList(sectors, sector));

  const handleAddOrganization = (newOrganization) => setOrganizations(addItemAndGetUpdatedList(organizations, newOrganization));

  const handleDeleteOrganization = (organization) => setOrganizations(deleteItemAndGetUpdatedList(organizations, organization));

  const handleOpenDeleteWarningDialog = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteWarningDialog = () => setIsDeleteDialogOpen(false);
  const handleDeleteBundle = () => {
    adminBundleRoleAxios.delete(`${REST_ADMIN_BUNDLES}/${_id}`)
      .then(() => {
        history.push(ROUTE_ADMIN_BUNDLE_BUNDLES);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveBundle = () => {
    const newBundle = {
      _id,
      name,
      type,
      year,
      quarter,
      templates,
      organizations,
      sectors,
    };

    adminBundleRoleAxios.put(REST_ADMIN_BUNDLES, { newBundle })
      .catch((error) => console.error(error));
  };

  const handlePublishBundle = () => {
    const newBundle = {
      _id,
      name,
      type,
      year,
      quarter,
      templates,
      organizations,
      sectors,
      published: true
    };

    adminBundleRoleAxios.put(`${REST_ADMIN_BUNDLES}/publish`, { newBundle })
      .catch((error) => console.error(error));
  };

  const handleCancelChanges = () => history.push(ROUTE_ADMIN_BUNDLE_BUNDLES);

  const currentQuarter = quarter ? { label: quarter, value: quarter } : null;

  let quarters = [];

  for(let i = 1; i < 5; i++) {
    const quarterString = `Q${i}`;
    quarters.push({ label: quarterString, value: quarterString });
  }

  const entityStyles = {
    marginTop: 20,
    padding: 20,
    border: "1px solid lightgray",
    borderRadius: 3
  };

  const descriptionTextFieldProps = {
    variant: "outlined",
    multiline: true,
    InputProps: {
      style: {
        minHeight: 200
      }
    }
  };

  return (
    <Paper className="bundlePage">
      <BundleHeader handleOpenDeleteWarningDialog={handleOpenDeleteWarningDialog}/>
      <Divider/>
      <BundleTextField label="Name" text={name} handleChange={handleChangeName}/>
      <BundleTextField label="Type" text={type} handleChange={handleChangeType}/>
      <BundleTextField label="Year" text={year} handleChange={handleChangeYear}/>
      <BundleSelectField label="Quarter" value={currentQuarter} options={quarters} handleChange={handleChangeQuarter}/>
      <BundleTextField label="Description" textFieldProps={descriptionTextFieldProps}/>
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
      <EditorActions 
        handleSave={handleSaveBundle}
        handlePublish={handlePublishBundle}
        handleCancel={handleCancelChanges}
      />
      <TextDialog 
        open={isDeleteDialogOpen} 
        title="Delete Bundle" 
        message="Are you sure you want to delete this bundle?"
        handleClose={handleCloseDeleteWarningDialog}
        handleConfirm={handleDeleteBundle}
      />
    </Paper>
  );
};

const Bundle = ({ 
  match: { params: { _id } }, 
  history
}) => {
  const [ name, setName ] = useState("");
  const [ type, setType ] = useState("");
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
          const { name, type, templates, organizations, sectors, quarter, year } = bundle;

          setName(name);
          setType(type);
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
          _id={_id}
          name={name}
          type={type}
          year={year}
          quarter={quarter}
          templates={templates}
          publicTemplates={publicTemplates}
          publicOrganizations={publicOrganizations}
          publicSectors={publicSectors}
          organizations={organizations}
          sectors={sectors}
          setName={setName}
          setType={setType}
          setTemplates={setTemplates}
          setOrganizations={setOrganizations}
          setSectors={setSectors}
          setYear={setYear}
          setQuarter={setQuarter}
          history={history}
        />
      : <Loading/>
  );
};

export default Bundle;