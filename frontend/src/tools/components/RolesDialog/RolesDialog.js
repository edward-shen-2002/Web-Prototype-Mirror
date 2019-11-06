import React, { useState, Fragment } from "react";

import { authAxios } from "tools/rest";

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

import { REST_AUTH_DATA } from "constants/rest";

import "./RolesDialog.scss";

const formatRoleString = (role) => (
  role.split("_")
    .map((string) => string === "LHIN" ? string : `${string.charAt(0)}${string.slice(1).toLocaleLowerCase()}`)
    .join(" ")
);

const RoleScope = ({ currentroleScopeOption, roleScopesOptions, handleSelectRoleScope }) => (
  <div className="roleScope">
    <Chip className="roleScope__label" label="Scope" color="primary" icon={<SignalCellularAltIcon/>}/>
    <Select className="roleScope__select" value={currentroleScopeOption} options={roleScopesOptions} onChange={handleSelectRoleScope}/>
  </div>
); 

const HierarchyEntitiesButtons = ({ handleClickOrganizations, /*handleClickLHINs,*/ handleClickSectors }) => (
  <ButtonGroup className="hierarchyButtons">
    <Button className="hierarchyButtons__button" color="secondary" variant="contained" onClick={handleClickOrganizations}>Organizations</Button>
    {/* <Button className="hierarchyButtons__button" color="secondary" variant="contained" onClick={handleClickLHINs}>LHINs</Button> */}
    <Button className="hierarchyButtons__button" color="secondary" variant="contained" onClick={handleClickSectors}>Sectors</Button>
  </ButtonGroup>
);

const RoleListContent = ({ role, roleContent: { scope, sectors, LHINs, organizations }, handleSelectRoleScope, handleOpenEntityDialog }) => {
  const roleScopesOptions = ROLE_SCOPES.map((scope) => ({ value: scope, label: (scope === "LHIN" || scope === "N/A") ? scope : `${scope.charAt(0)}${scope.slice(1).toLocaleLowerCase()}` }));

  const currentroleScopeOption =  roleScopesOptions.find(({ value }) => scope === value);

  const handleClickOrganizations = () => handleOpenEntityDialog(role, "organizations");
  // const handleClickLHINs = () => handleOpenEntityDialog(role, "LHINs");
  const handleClickSectors = () => handleOpenEntityDialog(role, "sectors");

  return (
    <ListItem className="roleListContent">
      <RoleScope currentroleScopeOption={currentroleScopeOption} roleScopesOptions={roleScopesOptions} handleSelectRoleScope={handleSelectRoleScope}/>
      <HierarchyEntitiesButtons 
        handleClickOrganizations={handleClickOrganizations} 
        // handleClickLHINs={handleClickLHINs} 
        handleClickSectors={handleClickSectors}
      />
    </ListItem>
  );
};

const RoleList = ({ role, roleContent, handleSelectRoleScope, handleOpenEntityDialog }) => (
  <List>
    <RoleListContent role={role} roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope} handleOpenEntityDialog={handleOpenEntityDialog}/>
  </List>
);

const RolesListItemContent = ({ isOpen, role, roleContent, handleSelectRoleScope, handleOpenEntityDialog }) => (
  <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <RoleList role={role} roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope} handleOpenEntityDialog={handleOpenEntityDialog}/>
  </Collapse>
);

const RolesListItemSummary = ({ role, isOpen, handleToggle }) => (
  <ListItem onClick={handleToggle} button>
    <ListItemText primary={role}/>
    {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
  </ListItem>
);

const RoleListItem = ({ role, roleContent, handleChangeRoleScope, handleOpenEntityDialog }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  
  const formattedRoleString = formatRoleString(role);
  
  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectRoleScope = ({ value }) => handleChangeRoleScope(role, value);

  return (
    <Fragment>
      <RolesListItemSummary isOpen={isOpen} role={formattedRoleString} handleToggle={handleToggle}/>
      <RolesListItemContent isOpen={isOpen} role={role} roleContent={roleContent} handleSelectRoleScope={handleSelectRoleScope} handleOpenEntityDialog={handleOpenEntityDialog}/>
    </Fragment>
  )
};

const RolesListItems = ({ userRoles, handleChangeRoleScope, handleOpenEntityDialog }) => Object.keys(userRoles).map((role) => (
  <RoleListItem 
    key={role} 
    role={role} 
    roleContent={userRoles[role]} 
    handleChangeRoleScope={handleChangeRoleScope} 
    handleOpenEntityDialog={handleOpenEntityDialog} 
  />
));

const RolesList = ({ userRoles, handleChangeRoleScope, handleOpenEntityDialog }) => (
  <List>
    <RolesListItems userRoles={userRoles} handleChangeRoleScope={handleChangeRoleScope} handleOpenEntityDialog={handleOpenEntityDialog}/>
  </List>
);

const RolesDialogContent = ({ userRoles, handleChangeRoleScope, handleAddRoleEntity, handleDeleteRoleEntity }) => {
  const [ isEntityDialogOpen, setIsEntityDialogOpen ] = useState(false);

  // For single role modification
  const [ role, setRole ] = useState("");
  const [ entityType, setEntityType ] = useState("");
  const [ entities, setEntities ] = useState([]);

  const handleOpenEntityDialog = (role, entityType) => {
    authAxios.get(`${REST_AUTH_DATA}/${entityType}`)
      .then(({ data: { data } }) => {
        const entities = data[entityType];

        setIsEntityDialogOpen(true);
        setEntityType(entityType);
        setEntities(entities);
        setRole(role);
      })
      .catch((error) => console.error(error));
  };

  const handleCloseEntityDialog = () => {
    if(isEntityDialogOpen) setIsEntityDialogOpen(false);
    if(entityType) setEntityType("");
    if(role) setRole("");
  };
  
  const handleAddEntity = (entity) => handleAddRoleEntity(role, entityType, entity);

  const handleDeleteUserEntity = (entity) => handleDeleteRoleEntity(role, entityType, entity);

  const userEntities = (!role || !entityType) ? [] : userRoles[role][entityType];

  const formattedEntityType = `${entityType.charAt(0).toUpperCase()}${entityType.slice(1)}`;
  const formattedRoleString = formatRoleString(role);
  const entityTypeStringLength = entityType.length;

  const title = `${formattedRoleString} ${formattedEntityType}`;
  const userTitle = `Current ${formattedEntityType}`;
  const userSearchPlaceholder = `Search Role ${formattedEntityType}...`;
  const allTitle = `Add Role ${entityType.slice(0, entityTypeStringLength)}`;
  const allSearchPlaceholder = `Search ${entityType.slice(0, entityTypeStringLength)}...`;

  return (
    <DialogContent className="rolesContent">
      <RolesList userRoles={userRoles} handleOpenEntityDialog={handleOpenEntityDialog} handleChangeRoleScope={handleChangeRoleScope}/>
      <HierarchyEntitiesDialog 
        open={isEntityDialogOpen}
        title={title}
        userTitle={userTitle}
        userEntities={userEntities}
        entities={entities}
        userSearchPlaceholder={userSearchPlaceholder}
        allTitle={allTitle}
        allSearchPlaceholder={allSearchPlaceholder}
        handleAddEntity={handleAddEntity}
        handleDeleteUserEntity={handleDeleteUserEntity}
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

const RolesDialog = ({ open, userRoles, handleClose, handleChangeRoleScope, handleAddRoleEntity, handleDeleteRoleEntity }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>User Roles</DialogTitle>
    <RolesDialogContent userRoles={userRoles} handleChangeRoleScope={handleChangeRoleScope} handleAddRoleEntity={handleAddRoleEntity} handleDeleteRoleEntity={handleDeleteRoleEntity}/>
    <RolesDialogActions handleClose={handleClose}/>
  </Dialog>
);

export default RolesDialog;