import React, { useState, useEffect, lazy } from "react";

import uniqid from "uniqid";

import { adminOrganizationRoleAxios } from "tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";

import { REST_ADMIN_ORGANIZATIONS } from "constants/rest";

const MaterialTable = lazy(() => import("material-table"));

import "./Organizations.scss";

// TODO : Highlight current sector - by sectorId

const SectorsListItems = ({ sectors, handleSelect }) => sectors.map((sector) => {
  const { name } = sector;

  const handleSelectItem = () => handleSelect(sector);

  return (
    <ListItem key={uniqid()} onClick={handleSelectItem} button>
      <ListItemText primary={name}/>
    </ListItem>
  );
});

const SectorsList = ({ sectors, handleSelect }) => (
  <List>
    <SectorsListItems sectors={sectors} handleSelect={handleSelect}/>
  </List>
);

const SectorsDialogContent = ({ sectors, handleSelect }) => {
  const [ query, setQuery ] = useState("");

  const newSectors = sectors.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  return (
    <DialogContent>
      <TextField label="Search Sector..." type="search" onChange={handleQueryChange} autoFocus/>
      <SectorsList sectors={newSectors} handleSelect={handleSelect}/>
    </DialogContent>
  );
};

const SectorsDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
);

const SectorsDialog = ({ sectors, open, handleClose, handleSelect }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Change Sectors</DialogTitle>
    <SectorsDialogContent sectors={sectors} handleSelect={handleSelect}/>
    <SectorsDialogActions handleClose={handleClose}/>
  </Dialog>
);

const SectorEditComponent = ({ value: { name }, onChange }) => {
  const [ isSectorsDialogOpen, setIsSectorsDialogOpen ] = useState(false);
  const [ sectors, setSectors ] = useState([ { name: "HEALTH", sectorId: "SAMPLEID" }, { name: "ENV", sectorId: "ENVID" } ]);

  const handleOpenSectorsDialog = () => {
    setIsSectorsDialogOpen(true);

    // TODO: Fetch sectors
  }; 

  const handleCloseSectorsDialog = () => {
    setIsSectorsDialogOpen(false);
    setSectors([]);
  };

  const handleSelectSector = (newSector) => {
    // TODO: Update sector in db
    onChange(newSector);
    handleCloseSectorsDialog();
  };

  return (
    <div>
      <Button onClick={handleOpenSectorsDialog}>{name}</Button>
      <SectorsDialog open={isSectorsDialogOpen} sectors={sectors} handleClose={handleCloseSectorsDialog} handleSelect={handleSelectSector}/>
    </div>
  );
};

const SectorRender = ({ sector: { name } }) => name;

const Organizations = () => {
  // const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ organizations, setOrganizations ] = useState([{ sector: { name: "HEALTH", sectorId: "SAMPLEID" }, name: "tst", code: "123" }]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  

  useEffect(() => {
    // if(!isDataFetched) {
    //   adminOrganizationRoleAxios.get(REST_ADMIN_ORGANIZATIONS)
    //     .then(() => console.log("success"))
    //     .catch((error) => console.error(error));
    //   setIsDataFetched(true);
    // }
  });

  const columns = [
    { title: "Sector", field: "sector", render: SectorRender, editComponent: SectorEditComponent },
    { title: "Code", field: "code" },
    { title: "Name", field: "name" }
  ];

  const handleRowAdd = (newOrganization) => new Promise((resolve, reject) => {
    setOrganizations([ ...organizations, newOrganization ]);
    resolve();
  });

  const handleRowUpdate = () => {};

  const handleRowDelete = () => {};

  const actions = [ 
    { icon: PersonIcon, tooltip: "View Users", onClick: () => console.log("cl") }, 
    { icon: SupervisorAccount, tooltip: "View Managers", onClick: () => console.log("clicked managers") } 
  ];

  return (
    <div className="organizations">
      <MaterialTable
        title="Organizations"
        columns={columns}
        data={organizations}
        actions={actions}
        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
        options={{ actionsColumnIndex: -1 }}
      />
    </div>
  );
};

export default Organizations;
