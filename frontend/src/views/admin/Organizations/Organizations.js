import React, { useState, useEffect, lazy } from "react";

import uniqid from "uniqid";

import { authAxios, adminOrganizationRoleAxios } from "tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";

import { REST_AUTH_DATA, REST_ADMIN_ORGANIZATIONS } from "constants/rest";

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

  const filteredSectors = sectors.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  return (
    <DialogContent>
      <TextField label="Search Sector..." type="search" onChange={handleQueryChange} autoFocus/>
      <SectorsList sectors={filteredSectors} handleSelect={handleSelect}/>
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

const SectorEditComponent = ({ value, onChange, rowData: organization }) => {
  const [ isSectorsDialogOpen, setIsSectorsDialogOpen ] = useState(false);
  const [ sectors, setSectors ] = useState([]);

  value = value ? value : { name: "", sectorId: "" };

  let { name } = value;

  const handleOpenSectorsDialog = () => {
    setIsSectorsDialogOpen(true);

    authAxios.get(`${REST_AUTH_DATA}/sectors`)
      .then(({ data: { data: { sectors } } }) => setSectors(sectors))
      .catch((error) => console.error(error));
  }; 

  const handleCloseSectorsDialog = () => {
    setIsSectorsDialogOpen(false);
    setSectors([]);
  };
  
  const handleSelectSector = (newSector) => {
    onChange(newSector);
    handleCloseSectorsDialog();
  };

  return (
    <div>
      <Button onClick={handleOpenSectorsDialog}>{name ? name : "NONE"}</Button>
      <SectorsDialog open={isSectorsDialogOpen} sectors={sectors} handleClose={handleCloseSectorsDialog} handleSelect={handleSelectSector}/>
    </div>
  );
};

const SectorRender = ({ sector: { name } }) => name;

const Organizations = () => {
  const [ organizations, setOrganizations ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  
  useEffect(() => {
    if(!isDataFetched) {
      adminOrganizationRoleAxios.get(REST_ADMIN_ORGANIZATIONS)
        .then(({ data: { data: { organizations } } }) => setOrganizations(organizations))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    }
  });

  const columns = [
    { title: "Sector", field: "sector", render: SectorRender, editComponent: SectorEditComponent },
    { title: "Code", field: "code" },
    { title: "Name", field: "name" }
  ];

  const handleRowAdd = (newOrganization) => new Promise((resolve, reject) => {
    adminOrganizationRoleAxios.post(REST_ADMIN_ORGANIZATIONS, { newOrganization })
      .then(({ data: { data: { organization } } }) => {
        setOrganizations([ ...organizations, organization ]);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });

  const handleRowUpdate = (newOrganization, oldOrganization) => new Promise((resolve, reject) => {
    adminOrganizationRoleAxios.put(REST_ADMIN_ORGANIZATIONS, { newOrganization })
      .then(() => {
        const oldOrganizationIndex = organizations.indexOf(oldOrganization);
        setOrganizations([ ...organizations.slice(0, oldOrganizationIndex), newOrganization, ...organizations.slice(oldOrganizationIndex + 1) ]);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });

  const handleRowDelete = (oldOrganization) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminOrganizationRoleAxios.delete(`${REST_ADMIN_ORGANIZATIONS}/${oldOrganization._id}`)
        .then(() => {
          const oldOrganizationIndex = organizations.indexOf(oldOrganization);
          setOrganizations([ ...organizations.slice(0, oldOrganizationIndex), ...organizations.slice(oldOrganizationIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
      }, 1000);
  });

  const actions = [ 
    { icon: PersonIcon, tooltip: "View Users", onClick: () => {} }, 
    { icon: SupervisorAccountIcon, tooltip: "View Managers", onClick: () => {} },
    { icon: ContactPhoneIcon, tooltip: "View contacts", onClick: () => {} }
  ];
  
  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };

  const options = { actionsColumnIndex: -1 };

  return (
    <div className="organizations">
      <MaterialTable
        title="Organizations"
        columns={columns}
        data={organizations}
        actions={actions}
        editable={editable}
        options={options}
      />
    </div>
  );
};

export default Organizations;
