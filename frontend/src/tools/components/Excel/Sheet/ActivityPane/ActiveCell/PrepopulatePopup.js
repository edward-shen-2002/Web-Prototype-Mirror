import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import { LabeledTextField } from "./components";
import { DialogActions } from "./components";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { publicAxios } from "@tools/rest";

import { REST_PUBLIC_DATA } from "@constants/rest";

import ListItemText from "@material-ui/core/ListItemText";

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
    <div className="prepopulate__groupLinksItem">
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
    <div className="prepopulate__groupLinks">
      <Typography variant="h6">Group Links</Typography>
      <GroupLinkListItems 
        groups={groups}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
        handleRemoveLink={handleRemoveLink}
      />
      <Button 
        className="prepopulate__button" 
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
      key={`prepopulate-group-${index}`}
      className={`${selectedGroup === id ? "prepopulate__groupItem" : ""}`}
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
      className="prepopulate__groupList"
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
  <div className="prepopulate__groupSectionContent">
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
  <div className="prepopulate__groupSection">
    <Typography variant="h6">{type}</Typography>
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

const PrepopulatePopup = ({
  type,
  quarter,
  year,
  categoryGroups,
  eventListenerRef
}) => {
  const [ newType, setNewType ] = useState(type ? type : "");
  const [ newQuarter, setNewQuarter ] = useState(quarter ? quarter : "");
  const [ newYear, setNewYear ] = useState(year ? year : "");
  const [ newCategoryGroups, setNewCategoryGroups ] = useState(categoryGroups ? categoryGroups : []);
  const [ definedGroups, setDefinedGroups ] = useState([]);
  const [ categoryGroupPointer, setCategoryGroupPointer ] = useState(categoryGroups && categoryGroups.length ? categoryGroups.length - 1 : -1 );
  const [ selectedCategoryGroup, setSelectedCategoryGroup ] = useState();
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  const handleChangeType = ({ target: { value } }) => setNewType(value);
  const handleChangeQuarter = ({ target: { value } }) => setNewQuarter(value);
  const handleChangeYear = ({ target: { value } }) => setNewYear(value);
  const handleUpdateCategoryGroupPointer = (index) => setCategoryGroupPointer(index);
  const handleRemoveCategoryLink = (index) => {
    setNewCategoryGroups(newCategoryGroups.slice(0, index));
    setCategoryGroupPointer(index - 1);
  };
  const handleSelectCategoryGroup = ({ id, value }) => {
    setNewCategoryGroups([  ...newCategoryGroups.slice(0, categoryGroupPointer), { id, value }, ...newCategoryGroups.slice(categoryGroupPointer + 1) ]);
    setSelectedCategoryGroup(id);
  };

  const handleAddNewCategoryLink = () => {
    setNewCategoryGroups([ ...newCategoryGroups, { id: null, value: null } ]);
    setCategoryGroupPointer(categoryGroupPointer + 1);
  };

  const handleChangePrepopulate = () => {
    if(!isGroupsValid(newCategoryGroups)) return console.error("Cannot have empty links");

    eventListenerRef.current.setPrepopulate({ 
      type: newType, 
      quarter: newQuarter, 
      year: newYear,
      categoryGroups: newCategoryGroups
    });
  }
  const handleCloseActiveCellDialog = () => eventListenerRef.current.resetActiveCellDialog();


  useEffect(() => {
    if(!isDataFetched) {
      setIsDataFetched(true);

      publicAxios.get(`${REST_PUBLIC_DATA}/groups`)
        .then(({ data: { data: { groups } } }) => {
          setDefinedGroups(groups);
        })
        .catch((error) => console.error(error));
    }
  }, [ isDataFetched ]);

  return (
    <div className="dialog prepopulate">
      <Typography variant="h6">Prepopulate</Typography>
      <LabeledTextField 
        label="Type" 
        text={newType} 
        handleChange={handleChangeType}
      />
      <LabeledTextField 
        label="Quarter" 
        text={newQuarter} 
        handleChange={handleChangeQuarter}
      />
      <LabeledTextField 
        label="Year" 
        text={newYear} 
        handleChange={handleChangeYear}
      />
      <GroupSection
        type="Category Groups"
        groups={newCategoryGroups}
        definedGroups={definedGroups}
        selectedGroup={selectedCategoryGroup}
        handleRemoveLink={handleRemoveCategoryLink}
        handleUpdateGroupPointer={handleUpdateCategoryGroupPointer}
        handleSelectGroup={handleSelectCategoryGroup}
        handleAddNewLink={handleAddNewCategoryLink}
      />
      {/* <GroupSection
        type="Attribute Groups"
        groups={newAttributeGroups}
        definedGroups={definedGroups}
        selectedGroup={selectedAttributeGroup}
        handleRemoveLink={handleRemoveAttributeGroupLink}
        handleUpdateGroupPointer={handleUpdateAttributeGroupPointer}
        handleSelectGroup={handleSelectAttributeGroup}
        handleAddNewLink={handleAddNewAttributeGroupLink}
      /> */}
      <DialogActions
        handleAdd={handleChangePrepopulate}
        handleCancel={handleCloseActiveCellDialog}
      />
    </div>
  );
};

export default PrepopulatePopup;