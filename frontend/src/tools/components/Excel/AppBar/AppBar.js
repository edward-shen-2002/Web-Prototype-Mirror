import React, { useState } from "react";

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 

import Options from "./Options";

import "./AppBar.scss";

const styles = () => ({
  inputStyle: {
    margin: "11px 2px 11px 2px",
    padding: 2,
    paddingLeft: 10,
    border: "2px solid #FFF0",
    borderRadius: 3,
    "&:hover": {
      border: "2px solid #E5E5E5",
    },
    "&:focus": {
      border: "2px solid #1A73E8",
    }
  }
});

const ExcelIconButton = ({ returnLink }) => (
  <IconButton>
    <Link to={returnLink}>
      <FileTableOutline className="excelIcon"/>
    </Link>
  </IconButton>
);

const ExcelHeaderTitle = ({ inputStyle, value, handleBlur, handleKeyDown, handleChange }) => <InputBase classes={{ input: inputStyle }} fullWidth type="text" value={value} onBlur={handleBlur} onKeyDown={handleKeyDown} onChange={handleChange}/>;

/**
 * The header of the workbook, which contains the title (?and related actions)
 */
const ExcelHeader = ({ inputStyle, title, handleBlur, handleKeyDown, handleTitleChange }) => (
  <div>
    <ExcelHeaderTitle inputStyle={inputStyle} value={title} handleBlur={handleBlur} handleKeyDown={handleKeyDown} handleChange={handleTitleChange}/>
    <Options />
  </div>
);

const ExcelAppBar = ({ name, returnLink, classes: { inputStyle }, handleSubmitName }) => {
  // Local title associated with temporary changes (workbook title changes only on blur, not on input change)
  const [ title, setTitle ] = useState(name);
  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") target.blur();
  };

  // Changes the workbook title when and only when blur occurs
  const handleBlur = () => handleSubmitName(title);

  return (
    <AppBar className="excelAppBar" position="static" color="default">
      <ExcelIconButton returnLink={returnLink}/>
      <ExcelHeader inputStyle={inputStyle} title={title} handleBlur={handleBlur} handleKeyDown={handleKeyDown} handleTitleChange={handleTitleChange}/>
    </AppBar>
  );
};

export default withStyles(styles)(ExcelAppBar);