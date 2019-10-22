import React, { lazy, useEffect, useState } from "react";

import { adminUserRoleAxios } from "tools/rest";

import { REST_ADMIN_USERS } from "constants/rest";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";

// TODO : Implement pagination
// TODO : column editable function
// TODO : Add data to the server
const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminUserRoleAxios.get(REST_ADMIN_USERS)
        .then(({ data: { data: { users } } }) => setUsers(users.map((user) => ({ ...user, password: "" }))))
        .catch((error) => console.error(error));
      
      setIsDataFetched(true);
    }
  });

  // Construct the table data
  const columns = [
    { title: "Username", field: "username" },
    { title: "Email", field: "email" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Password", field: "password" },
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Creation Date", field: "creationDate", type: "date", render: ({ creationDate }) => new Date(creationDate).toLocaleString() },
    { title: "Active", field: "active", type: "boolean" }
  ];

  const handleRowAdd = (newUser) => new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
      setUsers([ ...users, newUser ]);
    }, 600);
  });

  const handleRowDelete = (oldUser) => new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const handleRowUpdate = (newUser, oldUser) => new Promise((resolve, _reject) => {
    setTimeout(() => resolve(), 1000);
  });

  return (
    <div className="usersPage">
      <MaterialTable
        className="usersTable"
        title="All Users"
        columns={columns}
        data={users}
        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
        options={{ actionsColumnIndex: -1 }}
      />
    </div>
  );
};

export default Users;