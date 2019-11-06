import React, { lazy, useEffect, useState } from "react";

import { adminUserRoleAxios } from "tools/rest";

import { REST_ADMIN_REGISTRATIONS } from "constants/rest";

const MaterialTable = lazy(() => import("material-table"));

import "./Registrations.scss";

// TODO : Implement pagination
const Registrations = () => {
  const [ requests, setRequests ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminUserRoleAxios.get(REST_ADMIN_REGISTRATIONS)
        .then(({ data: { data: { users } } }) => setRequests(users.map((user) => ({ ...user, password: "" }))))
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
    { title: "Creation Date", field: "creationDate", type: "date", render: ({ creationDate }) => new Date(creationDate).toLocaleDateString() },
  ];

  const handleDeleteRequest = (userToDelete) => {
    const userToDeleteIndex = requests.indexOf(userToDelete);
    setRequests([ ...requests.slice(0, userToDeleteIndex), ...requests.slice(userToDeleteIndex + 1) ]);
  };

  const handleRowAdd = (newUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      // adminUserRoleAxios.post(REST_ADMIN_USERS, { newUser })
      // .then(() => {
      //   setRequests([ ...requests, { ...newUser, password: "" } ]);
      //   resolve();
      // })
      // .catch((error) => {
      //   console.error(error);
      //   reject();
      // });
    }, 600);
  });

  const handleRowDelete = (oldUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      // adminUserRoleAxios.delete(`${REST_ADMIN_USERS}/${oldUser.username}`)
      //   .then(() => {
      //     const oldUserIndex = requests.indexOf(oldUser);
      //     setRequests([ ...requests.slice(0, oldUserIndex), ...requests.slice(oldUserIndex + 1) ]);
      //     resolve();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     reject();
      //   });
    }, 1000);
  });

  const handleRowUpdate = (newUser, oldUser) => new Promise((resolve, reject) => {
    setTimeout(() => {
      // adminUserRoleAxios.put(REST_ADMIN_USERS, { newUser, oldUser })
      //   .then(() => {
      //     const oldUserIndex = requests.indexOf(oldUser);
      //     setRequests([ ...requests.slice(0, oldUserIndex), { ...newUser, password: "" }, ...requests.slice(oldUserIndex + 1) ]);
      //     resolve();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     reject();
      //   })
    }, 1000);
  });

  const handleApproveUser = (_event, user) => {
    adminUserRoleAxios.post(`${REST_ADMIN_REGISTRATIONS}/approve/${user._id}`)
      .then(() => {
        handleDeleteRequest(user);
      })
      .catch(({ response: { data } }) => {
        console.error(data);
      });
  };

  const actions = [ { icon: "check", tooltip: "Approve User", onClick: handleApproveUser } ];
  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };
  const options = { actionsColumnIndex: -1 };

  return (
    <div className="registrationsPage">
      <MaterialTable className="registrationsTable" title="Registrations" columns={columns} data={requests} actions={actions} editable={editable} options={options}/>
    </div>
  );
};

export default Registrations;