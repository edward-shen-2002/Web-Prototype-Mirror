import React, { useState, useEffect, lazy } from "react";

import uniqid from "uniqid";

import { adminOrganizationGroupRoleAxios } from "@tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { REST_ADMIN_SECTORS } from "@constants/rest";

import "./Groups.scss";

const MaterialTable = lazy(() => import("material-table"));

const Groups = () => {
  const [ groups, setGroups ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminOrganizationGroupRoleAxios.get(REST_ADMIN_SECTORS)
        .then(({ data: { data: { groups } } }) => setGroups(groups))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    } 
  });

  const handleRowAdd = (newGroup) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminOrganizationGroupRoleAxios.post(REST_ADMIN_SECTORS, newGroup)
      .then(() => {
        setGroups([ ...groups, newGroup ]);
        resolve();
      })
      .catch(reject);
    }, 600);
  });

  const handleRowDelete = (group) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminOrganizationGroupRoleAxios.delete(`${REST_ADMIN_SECTORS}/${group._id}`)
        .then(() => {
          const groupIndex = groups.indexOf(group);
          setGroups([ ...groups.slice(0, groupIndex), ...groups.slice(groupIndex + 1) ]);
          resolve();
        })
        .catch(reject);
    }, 1000);
  });

  const handleRowUpdate = (newGroup, oldGroup) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminOrganizationGroupRoleAxios.put(REST_ADMIN_SECTORS, { newGroup, oldGroup })
        .then(() => {
          const oldGroupIndex = groups.indexOf(oldGroup);
          setGroups([ ...groups.slice(0, oldGroupIndex), newGroup, ...groups.slice(oldGroupIndex + 1) ]);
          resolve();
        })
        .catch(reject);
    }, 1000);
  });

  const columns = [ { title: "Name", field: "name" } ];

  return (
    <div className="groupsPage">
      <MaterialTable
        className="groupsPage__table"
        title="Groups"
        columns={columns}
        data={groups}
        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
        options={{ actionsColumnIndex: -1 }}
      />
    </div>
  );
};

export default Groups;