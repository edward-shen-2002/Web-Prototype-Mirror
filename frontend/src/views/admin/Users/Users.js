import React, { lazy, useEffect, useState } from "react";

import { adminUserRoleAxios } from "tools/rest";

import { REST_ADMIN_USERS } from "constants/rest";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions"

import GroupIcon from "@material-ui/icons/Group";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";

const OrganizationsDialogContent = () => (
  <DialogContent>

  </DialogContent>
);

const OrganizationsDialogActions = () => (
  <DialogActions>

  </DialogActions>
);

const OrganizationsDialog = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <OrganizationsDialogContent/>
    <OrganizationsDialogActions/>
  </Dialog>
);

// TODO : Implement pagination
// TODO : Hierarchy filter - organization, LHIN, ...
const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ isOrganizationsDialogOpen, setIsOrganizationsDialogOpen ] = useState(false);
  const [ userOrganizations, setUserOrganizations ] = useState([]);

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
        reject();
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
          reject();
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
          reject();
        })
      }, 1000);
  });

  const handleOpenOrganizationsDialog = (_event, user) => {
    if(!isOrganizationsDialogOpen) {
      setIsOrganizationsDialogOpen(true);
      adminUserRoleAxios.get(`${REST_ADMIN_USERS}/${user._id}/organizations`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCloseOrganizationsDialog = () => {
    if(isOrganizationsDialogOpen) setIsOrganizationsDialogOpen(false);
    if(userOrganizations) setUserOrganizations([]);
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

  return (
    <div className="usersPage">
      <MaterialTable
        className="usersTable"
        title="Users"
        columns={columns}
        actions={actions}
        data={users}
        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
        options={{ actionsColumnIndex: -1 }}
      />
      <OrganizationsDialog open={isOrganizationsDialogOpen} handleClose={handleCloseOrganizationsDialog}/>
    </div>
  );
};

export default Users;