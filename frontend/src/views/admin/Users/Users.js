import React, { lazy, useEffect, useState } from "react";

import { isObjectEmpty } from "tools/misc";
import { authAxios, adminUserRoleAxios } from "tools/rest";

import { REST_AUTH_DATA, REST_ADMIN_USERS } from "constants/rest";

import GroupIcon from "@material-ui/icons/Group";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";

import RolesDialog from "./RolesDialog";

import HierarchyEntitiesDialog from "./HierarchyEntitiesDialog";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";

// TODO : Implement pagination
// TODO : Hierarchy filter - organization, LHIN, ...
const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ isOrganizationsDialogOpen, setIsOrganizationsDialogOpen ] = useState(false);

  const [ user, setUser ] = useState(null);
  const [ userOrganizationsMap, setUserOrganizationsMap ] = useState({});
  const [ userOrganizations, setUserOrganizations ] = useState([]);
  const [ organizations, setOrganizations ] = useState([]);

  const [ isRolesDialogOpen, setIsRolesDialogOpen ] = useState(false);
  const [ userRoles, setUserRoles ] = useState({});

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
        .then(({ data: { data: { user } } }) => {
          setUsers([ ...users, user ]);
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
      adminUserRoleAxios.put(REST_ADMIN_USERS, { updatedUser: newUser })
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
      const userOrganizationsMap = user.organizations;
      
      let userOrganizations = Object.keys(userOrganizationsMap).map((userOrganizationId) => ({ _id: userOrganizationId, ...userOrganizationsMap[userOrganizationId] }));

      authAxios.get(`${REST_AUTH_DATA}/organizations`)
        .then(({ data: { data: { organizations } } }) => {
          setUser(user);
          setUserOrganizationsMap(userOrganizationsMap);
          setUserOrganizations(userOrganizations);
          setOrganizations(organizations);
          setIsOrganizationsDialogOpen(true);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCloseOrganizationsDialog = () => {
    if(isOrganizationsDialogOpen) setIsOrganizationsDialogOpen(false);
    if(userOrganizations) setUserOrganizations([]);
    if(organizations) setOrganizations([]);
    if(!isObjectEmpty(userOrganizationsMap)) setUserOrganizationsMap({});
    if(user) setUser(null);
  };

  const handleOpenRolesDialog = (_event, user) => {
    setUser(user);
    setUserRoles(user.roles);
    setIsRolesDialogOpen(true);
  };

  const handleCloseRolesDialog = () => {
    if(isRolesDialogOpen) setIsRolesDialogOpen(false);
    if(user) setUser(null);
    if(userRoles) setUserRoles({});
  };

  const handleDeleteUserOrganization = (userOrganization) => {
    let newUserOrganizationsMap = { ...userOrganizationsMap };

    delete newUserOrganizationsMap[userOrganization._id];
    
    const userOrganizationIndex = userOrganizations.indexOf(userOrganization);
    const newUserOrganizations = [ ...userOrganizations.slice(0, userOrganizationIndex), ...userOrganizations.slice(userOrganizationIndex + 1) ];
    
    const updatedUser = { ...user, organizations: newUserOrganizationsMap };

    adminUserRoleAxios.put(REST_ADMIN_USERS, { updatedUser })
      .then(() => {
        const oldUserIndex = users.indexOf(user);
        
        setUsers([ ...users.slice(0, oldUserIndex), updatedUser, ...users.slice(oldUserIndex + 1) ]);
        setUser(updatedUser);
        setUserOrganizations(newUserOrganizations);
        setUserOrganizationsMap(newUserOrganizationsMap);
      })
      .catch((error) => console.error(error));
  };

  const handleAddOrganization = (newUserOrganization) => {
    if(userOrganizations.find(({ _id }) => _id === newUserOrganization._id)) {
      console.error("User is already a part of the selected organization");
    } else {
      let newUserOrganizationsMap = { ...userOrganizationsMap };
      newUserOrganizationsMap[newUserOrganization._id] = { ...newUserOrganization, _id: undefined };

      const updatedUser = { ...user, organizations: newUserOrganizationsMap };

      adminUserRoleAxios.put(REST_ADMIN_USERS, { updatedUser })
        .then(() => {
          const newUserOrganizations = [ ...userOrganizations, newUserOrganization ];
          const oldUserIndex = users.indexOf(user);
          
          setUsers([ ...users.slice(0, oldUserIndex), updatedUser, ...users.slice(oldUserIndex + 1) ]);
          setUser(updatedUser);
          setUserOrganizationsMap(newUserOrganizationsMap);
          setUserOrganizations(newUserOrganizations);
        })
        .catch((error) => console.error(error));
    }
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
      <HierarchyEntitiesDialog
        open={isOrganizationsDialogOpen}
        userEntities={userOrganizations} 
        entities={organizations} 
        title="Organizations"
        userTitle="Current Organizations"
        allTitle="Add User Organization"
        userSearchPlaceholder="Search User Organizations..."
        allSearchPlaceHolder="Search organizations..."
        handleClose={handleCloseOrganizationsDialog} 
        handleAddEntity={handleAddOrganization} 
        handleDeleteUserEntity={handleDeleteUserOrganization}
      />
      <RolesDialog
        open={isRolesDialogOpen}
        handleClose={handleCloseRolesDialog}
        userRoles={userRoles}
      />
    </div>
  );
};

export default Users;