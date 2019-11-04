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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import GroupIcon from "@material-ui/icons/Group";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";

import uniqid from "uniqid";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";

const UserOrgnaizationsOrganizationsDialogContent = ({  }) => {

};

const UserOrganizationsCurrentOrganizationsDialogContent = () => {

};

const UserOrganizationsDialogContent = ({ userOrganizations }) => {

  return (
    <DialogContent>
      
    </DialogContent>
  );
};

const UserOrganizationsDialogActions = () => (
  <DialogActions>

  </DialogActions>
);

const UserOrganizationsDialog = ({ open, userOrganizations, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>User Orgnaizations</DialogTitle>
    <UserOrganizationsDialogContent userOrganizations={userOrganizations}/>
    <UserOrganizationsDialogActions/>
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
      <UserOrganizationsDialog open={isOrganizationsDialogOpen} userOrganizations={userOrganizations} handleClose={handleCloseOrganizationsDialog}/>
    </div>
  );
};

export default Users;