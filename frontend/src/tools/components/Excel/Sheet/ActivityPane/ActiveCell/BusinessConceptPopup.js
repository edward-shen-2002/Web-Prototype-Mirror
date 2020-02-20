import React, { useState, useEffect, useRef } from "react";

import { publicAxios } from "@tools/rest";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { REST_PUBLIC_DATA } from "@constants/rest";

import { filterString } from "./utils";

const BusinessConceptsItems = ({ 
  businessConcepts, 
  type,
  eventListenerRef 
}) => businessConcepts.map(({ _id, id, value }) => {
  const handleClick = () => eventListenerRef.current.changeBusinessConcept(type, id);

  return (
    <ListItem
      key={_id}
      className="businessConcepts__item"
      alignItems="flex-start"
      button
      onClick={handleClick}
    >
      <div className="businessConcepts__id">{id}</div>
      <div className="businessConcepts__value">{value}</div>
    </ListItem>
  );
});

const BusinessConceptsList = ({ 
  businessConcepts, 
  type,
  eventListenerRef 
}) => (
  <List className="businessConcepts">
    <BusinessConceptsItems 
      type={type}
      businessConcepts={businessConcepts}
      eventListenerRef={eventListenerRef}
    />
  </List>
);

const BusinessConceptDialog = ({
  type,
  eventListenerRef
}) => {
  const [ businessConcepts, setBusinessConcepts ] = useState([]);
  const [ filter, setFilter ] = useState("");

  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      publicAxios.get(`${REST_PUBLIC_DATA}/business_concepts`)
        .then(({ data: { data: { businessConcepts } } }) => {
          setBusinessConcepts(businessConcepts);
          setIsDataFetched(true);
        })
        .catch((error) => console.error(error));
    }
  }, [ isDataFetched ]);

  const textFieldRef = useRef();

  useEffect(() => {
    textFieldRef.current.focus();
  }, [ textFieldRef ]);

  const filteredBusinessConcepts = businessConcepts.filter(({ id, value }) => filterString(filter, value) || filterString(filter, id));

  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleClick = () => textFieldRef.current.focus();

  return (
    <div 
      className="dialog"
      onClick={handleClick}
    >
      <Typography variant="h6">Set {type}</Typography>
      <TextField 
        placeholder="Search concepts"
        inputRef={textFieldRef}
        onChange={handleChangeFilter}
      />
      <BusinessConceptsList 
        type={type}
        businessConcepts={filteredBusinessConcepts}
        eventListenerRef={eventListenerRef}
      />
      {/* <DialogActions/> */}
    </div>
  );
};

export default BusinessConceptDialog;