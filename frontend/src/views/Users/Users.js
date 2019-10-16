import React, { lazy, useEffect, useState } from "react";

import { adminUserRoleAxios } from "tools/rest";

import { REST_POST_ADMIN_USERS } from "constants/rest";

import { FormControl, InputLabel, Select, Input, Checkbox, MenuItem, ListItemText } from "@material-ui/core";

const MaterialTable = lazy(() => import("material-table"));

import "./Users.scss";

// TODO : Implement pagination
// TODO : Style component
const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ dataFetched, setDataFetched ] = useState(false);

  useEffect(() => {
    if(!dataFetched) {
      adminUserRoleAxios.post(REST_POST_ADMIN_USERS)
        .then(({ data: { data: { users } } }) => {
          // Add an editable field for editing
          users = users.map((user) => ({ ...user, editable: false }));
          setUsers(users);
        })
        .catch((error) => console.error(error));
      
      setDataFetched(true);
    }
  });
  
  return (
    <div className="users">
      <MaterialTable
        title="All Users"
        columns={[
          { title: "Username", field: "username" },
          { title: "Email", field: "email" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Phone Number", field: "phoneNumber" },
          { title: "Creation Date", render: ({ creationDate }) => <time>{new Date(creationDate).toLocaleString()}</time> },
          { title: "Active",  render: ({ active }) => <p>{active.toString()}</p> },
        ]}
        data={users}
      />
    </div>
  );
};

export default Users;