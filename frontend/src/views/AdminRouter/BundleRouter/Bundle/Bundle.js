import React, { useState, useEffect, useMemo, useCallback } from "react";

import { publicAxios, adminBundleRoleAxios } from "@tools/rest";

import Select from "react-select";

import Loading from "@tools/components/Loading";
import TextDialog from "@tools/components/TextDialog";
import { deleteItemAndGetUpdatedList, addItemAndGetUpdatedList } from "@tools/components/EntitiesDialog";

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
  <TextField 
    className="field__input" 
    variant="outlined"
    value={text} 
    label={label}
    onChange={handleChange} 
    fullWidth
    {...textFieldProps} 
  />
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
  setSectors,
  setQuarter,
  setYear,
  history
}) => {
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  const handleChangeName = ({ target: { value } }) => setName(value);

  const handleChangeYear = ({ target: { value } }) => setYear(value);

  const handleChangeQuarter = ({ value }) => setQuarter(value);

  const publicTemplatesOptions = useMemo(
    () => publicTemplates.map((publicTemplate) => ({ value: publicTemplate, label: publicTemplate })),
    [ publicTemplates ]
  );

  const publicOrganizationsOptions = useMemo(
    () => publicOrganizations.map((publicOrganization) => ({ value: publicOrganization, label: publicOrganization })),
    [ publicOrganizations ]
  );

  const publicSectorsOptions = useMemo(
    () => publicSectors.map((publicSector) => ({ value: publicSector, label: publicSector })),
    [ publicSectors ]
  );

  const handleAddTemplate = useCallback(
    (newTemplate) => setTemplates(addItemAndGetUpdatedList(templates, newTemplate)),
    [ templates ]
  );

  const handleDeleteTemplate = useCallback(
    (template) => setTemplates(deleteItemAndGetUpdatedList(templates, template)),
    [ templates ]
  );

  const handleAddSector = useCallback(
    (newSector) => setSectors(addItemAndGetUpdatedList(sectors, newSector)),
    [ sectors ]
  );

  const handleDeleteSector = useCallback(
    (sector) => setSectors(deleteItemAndGetUpdatedList(sectors, sector)),
    [ sectors ]
  );

  const handleAddOrganization = useCallback(
    (newOrganization) => setOrganizations(addItemAndGetUpdatedList(organizations, newOrganization)),
    [ organizations ]
  );

  const handleDeleteOrganization = useCallback(
    (organization) => setOrganizations(deleteItemAndGetUpdatedList(organizations, organization)),
    [ organizations ]
  );

  const handleOpenDeleteWarningDialog = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteWarningDialog = () => setIsDeleteDialogOpen(false);

  const handleDeleteBundle = useCallback(
    () => (
      adminBundleRoleAxios.delete(`${REST_ADMIN_BUNDLES}/${_id}`)
        .then(() => history.push(ROUTE_ADMIN_BUNDLE_BUNDLES))
        .catch((error) => console.error(error))
    ),
    [ _id ]
  );

  const handleSaveBundle = useCallback(
    () => (
      adminBundleRoleAxios.put(
        REST_ADMIN_BUNDLES, 
        { 
          newBundle: { _id, name, year, quarter, templates, organizations, sectors }
        }
      )
      .catch((error) => console.error(error))
    ),
    [ _id, name, year, quarter, templates, organizations, sectors ]
  );

  const handlePublishBundle = useCallback(
    () => (
      adminBundleRoleAxios.put(
        `${REST_ADMIN_BUNDLES}/publish`, 
        { 
          newBundle: { _id, name, year, quarter, templates, organizations, sectors }
        }
      )
      .catch((error) => console.error(error))
    ),
    [ _id, name, year, quarter, templates, organizations, sectors ]
  );

  const handleCancelChanges = () => history.push(ROUTE_ADMIN_BUNDLE_BUNDLES);

  const currentQuarter = useMemo(
    () => quarter ? { label: quarter, value: quarter } : null,
    [ quarter ]
  );

  // ! Fetched from the database?
  const quarters = useMemo(
    () => {
      let quarters = [];

      for(let i = 1; i < 5; i++) {
        const quarterString = `Q${i}`;
        quarters.push({ label: quarterString, value: quarterString });
      }

      return quarters;
    },
    []
  );

  const descriptionTextFieldProps = useMemo(
    () => (
      {
        variant: "outlined",
        multiline: true,
        InputProps: {
          style: {
            minHeight: 200
          }
        }
      }
    ),
    []
  );

  return (
    <Paper className="bundlePage">
      <BundleHeader handleOpenDeleteWarningDialog={handleOpenDeleteWarningDialog}/>
      <Divider/>
      <BundleTextField label="Name" text={name} handleChange={handleChangeName}/>
      <BundleTextField label="Year" text={year} handleChange={handleChangeYear}/>
      <Select label="Quarter" placeholder="Quarter" value={currentQuarter} options={quarters} handleChange={handleChangeQuarter}/>
      <BundleTextField label="Description" textFieldProps={descriptionTextFieldProps}/>
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

const Bundle = ({ match: { params: { _id } }, history }) => {
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

  useEffect(
    () => {
      (
        async () => {
          try {
            const { 
              data: 
              { 
                data: { 
                  bundle: { name, templates, organizations, sectors, quarter, year }
                } 
              } 
            } = await adminBundleRoleAxios.get(`${REST_ADMIN_BUNDLES}/${_id}`);

            const { 
              data: { 
                data: { 
                  templates: publicTemplates 
                } 
              } 
            } = await publicAxios.get(`${REST_PUBLIC_DATA}/templates`);

            const { 
              data: { 
                data: { 
                  organizations: publicOrganizations 
                } 
              } 
            } = await publicAxios.get(`${REST_PUBLIC_DATA}/organizations`);

            const { 
              data: { 
                data: { 
                  sectors: publicSectors 
                } 
              } 
            } = await publicAxios.get(`${REST_PUBLIC_DATA}/sectors`);

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
        }
      )()
    },
    []
  );

  return (
    isDataFetched 
      ? <BundleContent
          _id={_id}
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
          setYear={setYear}
          setQuarter={setQuarter}
          history={history}
        />
      : <Loading/>
  );
};

export default Bundle;