import React from "react";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 

import Title from "./Title";

import Menu from "./Menu";

import "./AppBar.scss";

const ExcelIconButton = ({ returnLink }) => (
  <Link to={returnLink} className="excelIconButton">
    <Button><FileTableOutline className="excelIconButton__icon"/></Button>
  </Link>
);

/**
 * The header of the workbook, which contains the title (?and related actions)
 */
const Header = ({ name, handleSubmitName, handleSaveWorkbook }) => (
  <div>
    <Title name={name} handleSubmitName={handleSubmitName}/>
    <Menu handleSaveWorkbook={handleSaveWorkbook}/>
  </div>
);

const AppBar = ({ 
  name, 
  returnLink, 
  handleSubmitName,
  handleSaveWorkbook
}) => (
  <div className="appBar">
    <ExcelIconButton returnLink={returnLink}/>
    <Header name={name} handleSubmitName={handleSubmitName} handleSaveWorkbook={handleSaveWorkbook}/>
  </div>
);

export default AppBar;