import React, { useState, useEffect, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AddFabIconButton } from "tools/components/buttons";

import TextField from "@material-ui/core/TextField";

import { adminTemplateRoleAxios } from "tools/rest";
import { REST_ADMIN_TEMPLATES } from "constants/rest";

import { ROUTE_ADMIN_TEMPLATE_TEMPLATE } from "constants/routes";

import "./Templates.scss";

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

const TemplatesContent = ({ templates }) => (
  <Paper className="templatesContent">
    
  </Paper>
);

const TemplatesContainer = ({ history }) => {
  const [ query, setQuery ] = useState("");
  const [ templates, setTemplates ] = useState([]);
  const [ isDateFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDateFetched) {  
      adminTemplateRoleAxios.get(REST_ADMIN_TEMPLATES)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    } 
  }, [ isDateFetched ]);

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const filteredTemplates = useMemo(() => (
    templates.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
  ), [ query ]);

  const handleCreateTemplate = () => {
    adminTemplateRoleAxios.post(REST_ADMIN_TEMPLATES)
    .then((response) => {
        history.push(ROUTE_ADMIN_TEMPLATE_TEMPLATE);
        
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Header handleQueryChange={handleQueryChange} handleCreateTemplate={handleCreateTemplate}/>
      <TemplatesContent templates={filteredTemplates}/>
    </div>
  );
};

const Templates = (props) => (
  <div className="templatesPage">
    <TemplatesContainer {...props}/>
  </div>
);

export default Templates;