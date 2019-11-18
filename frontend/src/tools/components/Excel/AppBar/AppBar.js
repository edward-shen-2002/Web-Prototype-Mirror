import React, { useState } from "react";

import { Link } from "react-router-dom";

import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 

import "./AppBar.scss";

const ExcelIconButton = ({ returnLink }) => (
  <Link to={returnLink} className="excelIconButton">
    <Button><FileTableOutline className="excelIconButton__icon"/></Button>
  </Link>
);

/**
 * The header of the workbook, which contains the title (?and related actions)
 * TODO : Make input width contain text
 */
const ExcelHeader = ({ title, handleTitleBlur, handleTitleKeyDown, handleTitleChange }) => (
  <div>
    <InputBase className="appBarTitle" type="text" value={title} onBlur={handleTitleBlur} onKeyDown={handleTitleKeyDown} onChange={handleTitleChange}/>
  </div>
);

const ExcelAppBar = ({ name, returnLink, handleSubmitName }) => {
  // Local title associated with temporary changes (workbook title changes only on blur, not on input change)
  const [ title, setTitle ] = useState(name);

  const handleTitleChange = ({ target: { value } }) => setTitle(value);

  const handleTitleKeyDown = ({ key, target }) => {
    if(key === "Enter") target.blur();
  };

  // Changes the workbook title when and only when blur occurs
  const handleTitleBlur = () => {
    handleSubmitName(title)
      .catch(() => setTitle(title));
  };

  return (
    <div className="excelAppBar">
      <ExcelIconButton returnLink={returnLink}/>
      <ExcelHeader title={title} handleTitleBlur={handleTitleBlur} handleTitleKeyDown={handleTitleKeyDown} handleTitleChange={handleTitleChange}/>
    </div>
  );
};

export default ExcelAppBar;