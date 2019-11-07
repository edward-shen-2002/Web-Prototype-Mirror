import React, { useState, useEffect, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AddFabIconButton } from "tools/components/buttons";

import TextField from "@material-ui/core/TextField";

import TemplatesDialog from "./TemplatesDialog";

import "./Templates.scss";

const HeaderActions = ({ handleQueryChange, handleOpenTemplateDialog }) => (
  <div className="headerActions">
    <TextField className="headerActions__search" label="Search Templates..." variant="outlined" type="search" onChange={handleQueryChange}/>
    <AddFabIconButton className="headerActions__button" title="Create" handleAdd={handleOpenTemplateDialog}/>
  </div>
);

const Header = ({ handleQueryChange, handleOpenTemplateDialog }) => (
  <Paper className="header">
    <Typography variant="h5">Templates</Typography>
    <HeaderActions handleQueryChange={handleQueryChange} handleOpenTemplateDialog={handleOpenTemplateDialog}/>
  </Paper>
);

const TemplatesContent = ({ templates }) => (
  <Paper className="templatesContent">
    
  </Paper>
);

const TemplatesContainer = () => {
  const [ query, setQuery ] = useState("");
  const [ templates, setTemplates ] = useState([]);
  const [ isTemplateDialogOpen, setIsTemplateDialogOpen ] = useState(false);

  const handleOpenTemplateDialog = () => {
    setIsTemplateDialogOpen(true);
  };

  const handleCloseTemplatesDialog = () => {
    setIsTemplateDialogOpen(false);
  };
  
  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const filteredTemplates = useMemo(() => (
    templates.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
  ), [ query ]);

  return (
    <div>
      <Header handleQueryChange={handleQueryChange} handleOpenTemplateDialog={handleOpenTemplateDialog}/>
      <TemplatesContent templates={filteredTemplates}/>
      <TemplatesDialog open={isTemplateDialogOpen} handleClose={handleCloseTemplatesDialog}/>
    </div>
  );
};

const Templates = () => (
  <div className="templatesPage">
    <TemplatesContainer/>
  </div>
);

export default Templates;