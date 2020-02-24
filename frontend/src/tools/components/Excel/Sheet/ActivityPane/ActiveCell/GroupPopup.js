import React, { useState, useEffect, useRef } from "react";

import { publicAxios } from "@tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { REST_PUBLIC_DATA } from "@constants/rest";

import { filterString } from "./utils";

import { DialogActions } from "./components";

import "./GroupPopup.scss";

const LinkIcon = ({
  handleClick
}) => (
  <Button
    variant="contained"
    color="primary"
    onClick={handleClick}
  >
    <Icon>send</Icon>
  </Button>
);

const GroupLink = ({
  index,
  groupId,
  group,
  handleRemoveLink,
  handleUpdateGroupPointer
}) => {
  const handleClickLink = () => {
    handleRemoveLink(index);
  }
  const handleClickGroup = () => handleUpdateGroupPointer(index);

  return (
    <div className="groups__groupLinksItem">
      <LinkIcon
        handleClick={handleClickLink}
      />
      <Button
        onClick={handleClickGroup}
        fullWidth
      >
        {groupId !== null && group !== null ? `${groupId} - ${group}` : "EMPTY"}
        
      </Button>
    </div>
  );
};

const GroupLinkListItems = ({ 
  groups,
  handleRemoveLink,
  handleUpdateGroupPointer
}) => groups.map(({ id, value }, index) => {

  return (
    <GroupLink
      key={`group-link-${index}`}
      index={index}
      groupId={id}
      group={value}
      handleRemoveLink={handleRemoveLink}
      handleUpdateGroupPointer={handleUpdateGroupPointer}
    />
  );
});

const GroupLinkList = ({
  groups,
  handleAddNewLink,
  handleRemoveLink,
  handleUpdateGroupPointer
}) => {

  return (
    <div className="groups__groupLinks">
      <Typography variant="h6">Group Links</Typography>
      <GroupLinkListItems 
        groups={groups}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
        handleRemoveLink={handleRemoveLink}
      />
      <Button 
        className="groups__button" 
        variant="contained"
        color="primary"
        onClick={handleAddNewLink}
      >
        Add New Group
      </Button>
    </div>
  );
};

const GroupItems = ({
  groups,
  selectedGroup,
  handleSelectGroup
}) => groups.map(({ id, value }, index) => {
  const handleClickGroup = () => handleSelectGroup({ id, value });
  return (
    <ListItem
      key={`groups-group-${index}`}
      className={`${selectedGroup === id ? "groups__groupItem" : ""}`}
      onClick={handleClickGroup}
      button
    >
      <ListItemText primary={`${id} - ${value}`}/>
    </ListItem>
  );
});

const GroupList = ({
  groups,
  selectedGroup,
  
  handleSelectGroup
}) => {

  return (
    <List
      className="groups__groupList"
    >
      <Typography variant="h6">Groups</Typography>
      <GroupItems
        groups={groups}
        selectedGroup={selectedGroup}
        handleSelectGroup={handleSelectGroup}
      />
    </List>
  );
};

const GroupSectionContent = ({
  groups,
  definedGroups,
  selectedGroup,
  handleRemoveLink,
  handleUpdateGroupPointer,
  handleSelectGroup,
  handleAddNewLink
}) => (
  <div className="groups__groupSectionContent">
    <GroupLinkList
      groups={groups}
      handleUpdateGroupPointer={handleUpdateGroupPointer}
      handleRemoveLink={handleRemoveLink}
      handleAddNewLink={handleAddNewLink}
    />
    {
      groups.length 
      ? <GroupList
          groups={definedGroups}
          selectedGroup={selectedGroup}
          handleSelectGroup={handleSelectGroup}
        />
      : null
    }
  </div>
); 

const GroupSection = ({
  type,
  groups,
  definedGroups,
  selectedGroup,
  handleRemoveLink,
  handleUpdateGroupPointer,
  handleSelectGroup,
  handleAddNewLink
}) => (
  <div className="groups__groupSection">
    <GroupSectionContent
      groups={groups}
      definedGroups={definedGroups}
      selectedGroup={selectedGroup}
      handleRemoveLink={handleRemoveLink}
      handleUpdateGroupPointer={handleUpdateGroupPointer}
      handleSelectGroup={handleSelectGroup}
      handleAddNewLink={handleAddNewLink}
    />
  </div>
);

const isGroupsValid = (groups) => {
  if(!groups.length) return true;

  for(let element of groups) {
    const { id } = element;

    if(id === null) return false;
  }

  return true;
};

const GroupPopup = ({
  type,
  eventListenerRef
}) => {
  const [ groups, setGroups ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ newGroups, setNewGroups ] = useState([]);
  const [ groupPointer, setGroupPointer ] = useState(groups && groups.length ? groups.length - 1 : -1 );
  const [ selectedGroup, setSelectedGroup ] = useState();
  // const [ filterString, setFilterString ] = useState("");

  useEffect(() => {
    if(!isDataFetched) {
      setIsDataFetched(true);
      publicAxios.get(`${REST_PUBLIC_DATA}/groups`)
        .then(({ data: { data: { groups } } }) => {
          setGroups(groups);  
        })
        .catch((error) => console.error(error));
    }
  }, [ isDataFetched ]);

  const handleAdd = () => {
    eventListenerRef.current.changeGroup({
      type,
      newGroups
    });
  };

  const handleCancel = () => eventListenerRef.current.resetActiveCellDialog();

  const handleUpdateGroupPointer = (index) => setGroupPointer(index);
  const handleRemoveLink = (index) => {
    setNewGroups(newGroups.slice(0, index));
    setGroupPointer(index - 1);
  };
  const handleSelectGroup = ({ id, value }) => {
    setNewGroups([  ...newGroups.slice(0, groupPointer), { id, value }, ...newGroups.slice(groupPointer + 1) ]);
    setSelectedGroup(id);
  };

  const handleAddNewLink = () => {
    setNewGroups([ ...newGroups, { id: null, value: null } ]);
    setGroupPointer(groupPointer + 1);
  };

  // const filteredGroups = groups.filter(({ id, value }) => filterString(filter, value) || filterString(filter, id));

  return (
    <div 
      className="dialog groups"
    >
      <Typography variant="h6">Set {type} group</Typography>
      <GroupSection
        type={type}
        groups={newGroups}
        definedGroups={groups}
        selectedGroup={selectedGroup}
        handleRemoveLink={handleRemoveLink}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
        handleSelectGroup={handleSelectGroup}
        handleAddNewLink={handleAddNewLink}
      />
      <DialogActions
        handleAdd={handleAdd}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default GroupPopup;