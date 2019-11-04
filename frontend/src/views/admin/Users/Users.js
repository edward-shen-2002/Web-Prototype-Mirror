import React, { lazy, useEffect, useState } from "react";

import { authAxios, adminUserRoleAxios } from "tools/rest";

import { REST_AUTH_DATA, REST_ADMIN_USERS } from "constants/rest";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";
import GroupIcon from "@material-ui/icons/Group";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";

import uniqid from "uniqid";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";
import IconButton from "@material-ui/core/IconButton";

const OrganizationsListItems = ({ organizations, handleAddOrganization }) => organizations.map((organization) => {
  const { name } = organization;

  const handleAddOrganizationItem = () => handleAddOrganization(organization);

  return (
    <ListItem key={uniqid()} button onClick={handleAddOrganizationItem}>
      <ListItemText primary={name}/>
    </ListItem>
  )
});

const OrganizationsList = ({ organizations }) => (
  <List>
    <OrganizationsListItems organizations={organizations}/>
  </List>
);

const AllOrganizationsDialogContent = ({ organizations, handleQueryChange }) => {
  return (
    <div className="allOrganizationsContent">
      <TextField label="Search Organizations..." type="search" onChange={handleQueryChange} fullWidth/>
      <OrganizationsList organizations={organizations}/>
    </div>
  );
};

const DeleteButton = ({ handleDelete }) => (
  <IconButton onClick={handleDelete} aria-label="delete">
    <DeleteIcon/>
  </IconButton>
);

const UserOrganizationsListItemActions = ({ handleDeleteUserOrganization }) => (
  <ListItemSecondaryAction>
    <DeleteButton handleDelete={handleDeleteUserOrganization}/>
  </ListItemSecondaryAction>
);

const UserOrganizationsListItems = ({ userOrganizations, handleDeleteUserOrganization }) => userOrganizations.map((userOrganization) => {
  const { name } = userOrganization;

  const handleDeleteUserOrganizationItem = () => handleDeleteUserOrganization(userOrganization);

  return (
    <ListItem key={uniqid()} button>
      <ListItemText primary={name}/>
      <UserOrganizationsListItemActions handleDeleteUserOrganizationItem={handleDeleteUserOrganizationItem}/>
    </ListItem>
  );
});

const UserOrganizationsList = ({ userOrganizations }) => (
  <List>
    <UserOrganizationsListItems userOrganizations={userOrganizations}/>
  </List>
);

const UserOrganizationsDialogContent = ({ userOrganizations, handleQueryChange }) => {
  return (
    <div className="userOrganizationsContent">
      <TextField label="Search User Organizations..." type="search" onChange={handleQueryChange} autoFocus fullWidth/>
      <UserOrganizationsList userOrganizations={userOrganizations}/>
    </div>
  );
};

const OrganizationsDialogContent = ({ userOrganizations, organizations }) => {
  const [ userOrganizationsQuery, setUserOrganizationsQuery ] = useState("");
  const [ organizationsQuery, setOrganizationsQuery ] = useState("");

  let filteredUserOrganizations = userOrganizations.filter(({ name }) => name.toLowerCase().includes(userOrganizationsQuery.toLowerCase()));
  let filteredOrganizations = organizations.filter(({ name }) => name.toLowerCase().includes(organizationsQuery.toLowerCase()));

  const handleOrganizationsQueryChange = ({ target: { value } }) => setOrganizationsQuery(value);
  const handleUserOrganizationsQueryChange = ({ target: { value } }) => setUserOrganizationsQuery(value);

  const handleDeleteUserOrganization = (userOrganization) => {};
  const handleAddOrganization = (organization) => {};

  return (
    <DialogContent className="organizationsContent">
      <UserOrganizationsDialogContent userOrganizations={filteredUserOrganizations} handleQueryChange={handleUserOrganizationsQueryChange}/>
      <div className="verticalSeparator"></div>
      <AllOrganizationsDialogContent organizations={filteredOrganizations} handleQueryChange={handleOrganizationsQueryChange}/>
    </DialogContent>
  );
};

const OrganizationsDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
);

const OrganizationsDialog = ({ open, userOrganizations, organizations, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>User Organizations</DialogTitle>
    <OrganizationsDialogContent userOrganizations={userOrganizations} organizations={organizations}/>
    <OrganizationsDialogActions handleClose={handleClose}/>
  </Dialog>
);

const RolesDialogContent = () => (
  <DialogContent>

  </DialogContent>
);

const RolesDialogActions = () => (
  <DialogActions>

  </DialogActions>
);

const RolesDialog = ({ open, roles, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <RolesDialogContent roles={roles}/>
    <RolesDialogActions/>
  </Dialog>
);

// TODO : Implement pagination
// TODO : Hierarchy filter - organization, LHIN, ...
const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ isOrganizationsDialogOpen, setIsOrganizationsDialogOpen ] = useState(false);
  const [ userOrganizations, setUserOrganizations ] = useState([]);
  const [ organizations, setOrganizations ] = useState([]);

  useEffect(() => {
    if(!isDataFetched) {
      adminUserRoleAxios.get(REST_ADMIN_USERS)
        .then(({ data: { data: { users } } }) => setUsers(users.map((user) => ({ ...user, password: "" }))))
        .catch((error) => console.error(error));
      
      setIsDataFetched(true);
    }
  });
  
  const handleRowAdd = (newUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminUserRoleAxios.post(REST_ADMIN_USERS, { newUser })
      .then(() => {
        setUsers([ ...users, { ...newUser, password: "" } ]);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    }, 600);
  });

  const handleRowDelete = (oldUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminUserRoleAxios.delete(`${REST_ADMIN_USERS}/${oldUser._id}`)
        .then(() => {
          const oldUserIndex = users.indexOf(oldUser);
          setUsers([ ...users.slice(0, oldUserIndex), ...users.slice(oldUserIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
      }, 1000);
  });
  
  const handleRowUpdate = (newUser, oldUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminUserRoleAxios.put(REST_ADMIN_USERS, { newUser, oldUser })
        .then(() => {
          const oldUserIndex = users.indexOf(oldUser);
          setUsers([ ...users.slice(0, oldUserIndex), { ...newUser, password: "" }, ...users.slice(oldUserIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        })
      }, 1000);
  });

  const handleOpenOrganizationsDialog = async (_event, user) => {
    if(!isOrganizationsDialogOpen) {
      try {
        const userOrganizationsData = await adminUserRoleAxios.get(`${REST_ADMIN_USERS}/${user._id}/organizations`);
        const { data: { data: { userOrganizations } } } = userOrganizationsData;
        
        const organizationsData = await authAxios.get(`${REST_AUTH_DATA}/organizations`);
        const { data: { data: { organizations } } } = organizationsData;
        
        setUserOrganizations(userOrganizations);
        setOrganizations(organizations);
        setIsOrganizationsDialogOpen(true);
      } catch(error) {
        console.error(error);
      }
    }
  };

  const handleCloseOrganizationsDialog = () => {
    if(isOrganizationsDialogOpen) setIsOrganizationsDialogOpen(false);
    if(userOrganizations) setUserOrganizations([]);
    if(organizations) setOrganizations([]);
  };

  const handleOpenRolesDialog = () => {

  };
  
  const columns = [
    { title: "Username", field: "username" },
    { title: "Email", field: "email" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Password", field: "password" },
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Creation Date", field: "creationDate", type: "date", render: ({ creationDate }) => new Date(creationDate).toLocaleDateString() },
    { title: "Active", field: "active", type: "boolean" }
  ];

  const actions = [ 
    { icon: GroupIcon, tooltip: "View Organizations", onClick: handleOpenOrganizationsDialog },
    { icon: EnhancedEncryptionIcon, tooltip: "View Roles", onClick: handleOpenRolesDialog }
  ];

  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };

  const options = { actionsColumnIndex: -1 };

  return (
    <div className="usersPage">
      <MaterialTable className="usersTable" title="Users" columns={columns} actions={actions} data={users} editable={editable} options={options}/>
      <OrganizationsDialog open={isOrganizationsDialogOpen} userOrganizations={userOrganizations} organizations={organizations} handleClose={handleCloseOrganizationsDialog}/>
    </div>
  );
};

export default Users;