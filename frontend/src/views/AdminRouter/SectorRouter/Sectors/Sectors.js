import React, { useState, useEffect, lazy } from "react";

import uniqid from "uniqid";

import { adminSectorRoleAxios } from "@tools/rest";

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

import "./Sectors.scss";

const MaterialTable = lazy(() => import("material-table"));

const Sectors = () => {
  const [ sectors, setSectors ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminSectorRoleAxios.get(REST_ADMIN_SECTORS)
        .then(({ data: { data: { sectors } } }) => setSectors(sectors))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    } 
  });

  const handleRowAdd = (newSector) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminSectorRoleAxios.post(REST_ADMIN_SECTORS, newSector)
      .then(() => {
        setSectors([ ...sectors, newSector ]);
        resolve();
      })
      .catch(reject);
    }, 600);
  });

  const handleRowDelete = (sector) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminSectorRoleAxios.delete(`${REST_ADMIN_SECTORS}/${sector._id}`)
        .then(() => {
          const sectorIndex = sectors.indexOf(sector);
          setSectors([ ...sectors.slice(0, sectorIndex), ...sectors.slice(sectorIndex + 1) ]);
          resolve();
        })
        .catch(reject);
    }, 1000);
  });

  const handleRowUpdate = (newSector, oldSector) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminSectorRoleAxios.put(REST_ADMIN_SECTORS, { newSector, oldSector })
        .then(() => {
          const oldSectorIndex = sectors.indexOf(oldSector);
          setSectors([ ...sectors.slice(0, oldSectorIndex), newSector, ...sectors.slice(oldSectorIndex + 1) ]);
          resolve();
        })
        .catch(reject);
    }, 1000);
  });

  const columns = [ { title: "Name", field: "name" } ];

  return (
    <div className="sectorsPage">
      <MaterialTable
        className="sectorsPage__table"
        title="Sectors"
        columns={columns}
        data={sectors}
        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
        options={{ actionsColumnIndex: -1 }}
      />
    </div>
  );
};

export default Sectors;