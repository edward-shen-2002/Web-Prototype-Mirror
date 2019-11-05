import React, { useState, Fragment } from "react";

import uniqid from "uniqid";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Collapse from "@material-ui/core/Collapse";
import Chip from "@material-ui/core/Chip";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";

import Select from "react-select";

import HierarchyEntitiesDialog from "tools/components/HierarchyEntitiesDialog";

import { ROLE_SCOPES } from "constants/roles";

import "./RolesDialog.scss";

const RoleScope = ({ currentroleScopeOption, roleScopesOptions, handleSelectRoleScope }) => (
  <div className="roleScope">
    <Chip className="roleScope__label" label="Scope" color="primary" icon={<SignalCellularAltIcon/>}/>
    <Select className="roleScope__select" value={currentroleScopeOption} options={roleScopesOptions} onChange={handleSelectRoleScope}/>
  </div>
); 

const HierarchyEntitiesButtons = () => (
  <ButtonGroup className="hierarchyButtons">
    <Button className="hierarchyButtons__button" color="secondary" variant="contained">Organizations</Button>
    <Button className="hierarchyButtons__button" color="secondary" variant="contained">LHINs</Button>
    <Button className="hierarchyButtons__button" color="secondary" variant="contained">Sectors</Button>
  </ButtonGroup>
);

const RoleListContent = ({ roleContent: { scope, sectors, LHINs, organizations }, handleSelectRoleScope }) => {
  const roleScopesOptions = ROLE_SCOPES.map((scope) => ({ value: scope, label: (scope === "LHIN" || scope === "N/A") ? scope : `${scope.charAt(0)}${scope.slice(1).toLocaleLowerCase()}` }));

  const currentroleScopeOption =  roleScopesOptions.find(({ value }) => scope === value);

  return (
    <ListItem className="roleListContent">
      <RoleScope currentroleScopeOption={currentroleScopeOption} roleScopesOptions={roleScopesOptions} handleSelectRoleScope={handleSelectRoleScope}/>
      <HierarchyEntitiesButtons/>
    </ListItem>
  );
};

const RoleList = ({ roleContent, handleSelectRoleScope }) => (
  <List>
    <RoleListContent roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope}/>
  </List>
);

const RolesListItemContent = ({ isOpen, roleContent, handleSelectRoleScope }) => (
  <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <RoleList roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope}/>
  </Collapse>
);

const RolesListItemSummary = ({ role, isOpen, handleToggle }) => (
  <ListItem onClick={handleToggle} button>
    <ListItemText primary={role}/>
    {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
  </ListItem>
);

const RoleListItem = ({ role, roleContent, handleChangeRoleScope, handleOpenEntityDialog, handleCloseEntityDialog }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  
  const formattedRoleString = (
    role.split("_")
      .map((string) => string === "LHIN" ? string : `${string.charAt(0)}${string.slice(1).toLocaleLowerCase()}`)
      .join(" ")
  );
  
  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectRoleScope = ({ value }) => handleChangeRoleScope(role, value);

  return (
    <Fragment>
      <RolesListItemSummary isOpen={isOpen} role={formattedRoleString} handleToggle={handleToggle}/>
      <RolesListItemContent isOpen={isOpen} roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope}/>
    </Fragment>
  )
};

const RolesListItems = ({ userRoles, handleChangeRoleScope, handleOpenEntityDialog, handleCloseEntityDialog }) => Object.keys(userRoles).map((role) => (
  <RoleListItem 
    key={role} 
    role={role} 
    roleContent={userRoles[role]} 
    handleChangeRoleScope={handleChangeRoleScope} 
    handleOpenEntityDialog={handleOpenEntityDialog} 
    handleCloseEntityDialog={handleCloseEntityDialog}
  />
));

const RolesList = ({ userRoles, handleChangeRoleScope, handleOpenEntityDialog, handleCloseEntityDialog }) => (
  <List>
    <RolesListItems userRoles={userRoles} handleChangeRoleScope={handleChangeRoleScope} handleOpenEntityDialog={handleOpenEntityDialog} handleCloseEntityDialog={handleCloseEntityDialog}/>
  </List>
);

const RolesDialogContent = ({ userRoles, handleChangeRoleScope }) => {
  const [ isEntityDialogOpen, setIsEntityDialogOpen ] = useState(false);

  // For single role modification
  const [ role, setRole ] = useState("");
  const [ entityType, setEntityType ] = useState("");
  const [ entities, setEntities ] = useState([]);

  const handleOpenEntityDialog = (role, entityType) => {
    setIsEntityDialogOpen(true);
    setEntityType(entityType);
    setEntities(userRoles[role]);
    setRole(role);
  };

  const handleCloseEntityDialog = () => {
    if(isEntityDialogOpen) setIsEntityDialogOpen(false);
    if(entityType) setEntityType("");
    if(entities) setEntities([]);
    if(role) setRole("");
  };

  const formattedEntityType = entityType.toUpperCase();
  const entityTypeStringLength = entityType.length;

  const title = `${role} ${formattedEntityType}`;
  const userSearchPlaceholder = `Search Role ${formattedEntityType}...`;
  const allTitle = `Add Role ${entityType.slice(0, entityTypeStringLength)}`;
  const allSearchPlaceholder = `Search ${entityType.slice(0, entityTypeStringLength)}`;

  return (
    <DialogContent className="rolesContent">
      <RolesList userRoles={userRoles} handleOpenEntityDialog={handleOpenEntityDialog} handleCloseEntityDialog={handleCloseEntityDialog} handleChangeRoleScope={handleChangeRoleScope}/>
      <HierarchyEntitiesDialog 
        open={isEntityDialogOpen}
        title={title}
        entities={entities}
        userSearchPlaceholder={userSearchPlaceholder}
        allTitle={allTitle}
        allSearchPlaceholder={allSearchPlaceholder}
        handleClose={handleCloseEntityDialog}
      />
    </DialogContent>
  );
};

const RolesDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
);

const RolesDialog = ({ open, userRoles, handleClose, handleChangeRoleScope }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>User Roles</DialogTitle>
    <RolesDialogContent userRoles={userRoles} handleChangeRoleScope={handleChangeRoleScope}/>
    <RolesDialogActions handleClose={handleClose}/>
  </Dialog>
);

export default RolesDialog;