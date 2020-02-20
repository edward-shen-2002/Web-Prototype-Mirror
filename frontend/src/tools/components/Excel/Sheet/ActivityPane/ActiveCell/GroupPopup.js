import React, { useState, useEffect, useRef } from "react";

import { publicAxios } from "@tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { REST_PUBLIC_DATA } from "@constants/rest";

import { filterString } from "./utils";

import { DialogActions } from "./components";

const GroupsItems = ({ 
  groups, 
  selectedGroup,
  handleChangeGroup 
}) => groups.map(({ _id, id, value }) => {
  const handleClick = () => handleChangeGroup(id);

  return (
    <ListItem
      key={_id}
      className={`groups__item ${selectedGroup === id ? "groups__item--selected" : ""}`}
      alignItems="flex-start"
      button
      onClick={handleClick}
    >
      <div className="groups__id">{id}</div>
      <div className="groups__value">{value}</div>
    </ListItem>
  );
});

const GroupsList = ({ 
  eventListenerRef,
  groups, 
  selectedGroup,
  handleChangeGroup
}) => (
  <List className="groups">
    <GroupsItems 
      groups={groups}
      selectedGroup={selectedGroup}
      eventListenerRef={eventListenerRef}
      handleChangeGroup={handleChangeGroup}
    />
  </List>
);

const GroupSection = ({
  textFieldRef,
  filteredGroups,
  selectedGroup,
  handleChangeFilter,
  handleChangeGroup
}) => {

  return (
    <div className="groups__list">
      <TextField 
        inputRef={textFieldRef}
        onChange={handleChangeFilter}
        placeholder="Search groups"
        fullWidth
      />
      <GroupsList 
        groups={filteredGroups}
        selectedGroup={selectedGroup}
        handleChangeGroup={handleChangeGroup}
      />
    </div>
  );
};

const GroupPopup = ({
  type,
  eventListenerRef
}) => {
  const [ groups, setGroups ] = useState([]);
  const [ filter, setFilter ] = useState("");
  const [ layer, setLayer ] = useState("");
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ selectedGroup, setSelectedGroup ] = useState(null);

  useEffect(() => {
    if(!isDataFetched) {
      publicAxios.get(`${REST_PUBLIC_DATA}/groups`)
        .then(({ data: { data: { groups } } }) => {
          setGroups(groups);
          setIsDataFetched(true);
        })
        .catch((error) => console.error(error));
    }
  }, [ isDataFetched ]);

  const textFieldRef = useRef();

  useEffect(() => {
    textFieldRef.current.focus();
  }, [ textFieldRef ]);

  const filteredGroups = groups.filter(({ id, value }) => filterString(filter, value) || filterString(filter, id));

  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleChangeLayer = ({ target: { value } }) => setLayer(value);
  const handleChangeGroup = (group) => setSelectedGroup(group);

  const handleAdd = () => {
    if(selectedGroup === null || !layer) return console.error("Please select a hierarchy # and a group");

    eventListenerRef.current.changeGroup(type, selectedGroup, layer);
  };

  const handleCancel = () => eventListenerRef.current.resetActiveCellDialog();

  return (
    <div 
      className="dialog"
    >
      <Typography variant="h6">Set {type} group</Typography>
      <TextField
          placeholder="Hierarchy Level #"
          variant="outlined"
          value={layer}
          onChange={handleChangeLayer}
      />
      <GroupSection
        textFieldRef={textFieldRef}
        filteredGroups={filteredGroups}
        selectedGroup={selectedGroup}
        eventListenerRef={eventListenerRef}
        handleChangeFilter={handleChangeFilter}
        handleChangeGroup={handleChangeGroup}
      />
      <DialogActions
        handleAdd={handleAdd}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default GroupPopup;