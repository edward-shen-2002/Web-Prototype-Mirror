import React, { useState, useEffect, useMemo, lazy } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AddFabIconButton } from "tools/components/buttons";

import TextField from "@material-ui/core/TextField";

import LaunchIcon from "@material-ui/icons/Launch";

import { adminTemplateRoleAxios } from "tools/rest";
import { REST_ADMIN_TEMPLATES } from "constants/rest";

import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import "./Templates.scss";

const MaterialTable = lazy(() => import("material-table"));

const HeaderActions = ({ handleQueryChange, handleCreateTemplate }) => (
  <div className="headerActions">
    <TextField className="headerActions__search" label="Search Templates..." variant="outlined" type="search" onChange={handleQueryChange}/>
    <AddFabIconButton className="headerActions__button" title="Create" handleClick={handleCreateTemplate}/>
  </div>
);

const Header = ({ handleQueryChange, handleCreateTemplate }) => (
  <Paper className="header">
    <Typography variant="h5">Templates</Typography>
    <HeaderActions handleQueryChange={handleQueryChange} handleCreateTemplate={handleCreateTemplate}/>
  </Paper>
);

const TemplatesTable = ({ templates, history, handleRowAdd, handleRowDelete, handleRowUpdate }) => {
  const handleOpenTemplate = (_event, template) => {
    history.push(`${ROUTE_ADMIN_TEMPLATE_TEMPLATES}/${template._id}`);
  };

  const columns = [
    { title: "Name", field: "name" }
  ];

  const actions = [
    { icon: LaunchIcon, tooltip: "Open Template", onClick: handleOpenTemplate }
  ];

  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };

  const options = { actionsColumnIndex: -1, search: false, header: false, showTitle: false };

  return (
    <MaterialTable columns={columns} actions={actions} data={templates} editable={editable} options={options}/>
  );
};

// TODO : Add other views in the future
const TemplatesContent = ({ templates, isTableView, history, handleRowAdd, handleRowDelete, handleRowUpdate }) => (
  <TemplatesTable templates={templates} history={history} handleRowAdd={handleRowAdd} handleRowDelete={handleRowDelete} handleRowUpdate={handleRowUpdate}/>
);

const TemplatesContainer = ({ history }) => {
  const [ query, setQuery ] = useState("");
  const [ templates, setTemplates ] = useState([]);
  const [ isDateFetched, setIsDataFetched ] = useState(false);
  const [ isTableView, setIsTableView ] = useState(true);

  useEffect(() => {
    if(!isDateFetched) {  
      adminTemplateRoleAxios.get(REST_ADMIN_TEMPLATES)
        .then(({ data: { data: { templates } } }) => {
          setTemplates(templates);
        })
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    } 
  }, [ isDateFetched ]);

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const filteredTemplates = templates.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

  const handleCreateTemplate = () => {
    adminTemplateRoleAxios.post(REST_ADMIN_TEMPLATES)
    .then(({ data: { data: { template } } }) => {
        history.push(`${ROUTE_ADMIN_TEMPLATE_TEMPLATES}/${template._id}`);
      })
      .catch((error) => console.error(error));
  };

  const handleRowAdd = (newTemplate) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminTemplateRoleAxios.post(REST_ADMIN_TEMPLATES, { newTemplate })
        .then(({ data: { data: { template } } }) => {
          setTemplates([ ...templates, template ]);

          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 600);
  });

  const handleRowDelete = (template) => new Promise((resolve, reject) => {
    setTimeout(() => {

      adminTemplateRoleAxios.delete(`${REST_ADMIN_TEMPLATES}/${template._id}`)
        .then(() => {
          const templateIndex = templates.findIndex(({ _id }) => _id === template._id);

          setTemplates([ ...templates.slice(0, templateIndex), ...templates.slice(templateIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });
  
  const handleRowUpdate = (newTemplate, oldTemplate) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminTemplateRoleAxios.put(REST_ADMIN_TEMPLATES, { newTemplate, oldTemplate })
        .then(() => {
          const templateIndex = templates.findIndex(({ _id }) => _id === oldTemplate._id);

          setTemplates([ ...templates.slice(0, templateIndex), newTemplate, ...templates.slice(templateIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });

  return (
    <div>
      <Header handleQueryChange={handleQueryChange} handleCreateTemplate={handleCreateTemplate}/>
      <TemplatesContent templates={filteredTemplates} isTableView={isTableView} history={history} handleRowAdd={handleRowAdd} handleRowDelete={handleRowDelete} handleRowUpdate={handleRowUpdate}/>
    </div>
  );
};

const Templates = (props) => (
  <div className="templatesPage">
    <TemplatesContainer {...props}/>
  </div>
);

export default Templates;