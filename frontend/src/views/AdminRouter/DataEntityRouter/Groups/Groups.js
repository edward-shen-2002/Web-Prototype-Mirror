import React, { useState, useEffect, lazy } from "react";

import { adminDataEntityRoleAxios } from "@tools/rest";

import { REST_ADMIN_GROUPS } from "@constants/rest";

import "./Groups.scss";

const MaterialTable = lazy(() => import("material-table"));

const Groups = () => {
  const [ groups, setGroups ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  
  useEffect(() => {
    if(!isDataFetched) {
      adminDataEntityRoleAxios.get(REST_ADMIN_GROUPS)
        .then(({ data: { data: { groups } } }) => setGroups(groups))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    }
  });

  const columns = [
    { title: "ID", field: "id" },
    { title: "Value", field: "value" }
  ];

  const handleRowAdd = (newGroup) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminDataEntityRoleAxios.post(REST_ADMIN_GROUPS, { newGroup })
        .then(({ data: { data: { group } } }) => {
          setGroups([ ...groups, group ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 600);
  });

  const handleRowUpdate = (newGroup, oldGroup) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminDataEntityRoleAxios.put(REST_ADMIN_GROUPS, { newGroup })
        .then(() => {
          const oldGroupIndex = groups.indexOf(oldGroup);
          setGroups([ ...groups.slice(0, oldGroupIndex), newGroup, ...groups.slice(oldGroupIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });

  const handleRowDelete = (oldGroup) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminDataEntityRoleAxios.delete(`${REST_ADMIN_GROUPS}/${oldGroup._id}`)
        .then(() => {
          const oldGroupIndex = groups.indexOf(oldGroup);
          setGroups([ ...groups.slice(0, oldGroupIndex), ...groups.slice(oldGroupIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });

  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };

  const options = { actionsColumnIndex: -1 };

  return (
    <div className="groups">
      <MaterialTable
        className="groups__table"
        title="Groups"
        columns={columns}
        data={groups}
        editable={editable}
        options={options}
      />
    </div>
  );
};

export default Groups;
