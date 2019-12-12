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
const Header = ({ name, handleUpdateTemplate }) => (
  <div>
    <Title name={name} handleUpdateTemplate={handleUpdateTemplate}/>
    <Menu handleUpdateTemplate={handleUpdateTemplate}/>
  </div>
);

const AppBar = ({ 
  name, 
  returnLink, 
  handleUpdateTemplate
}) => (
  <div className="appBar">
    <ExcelIconButton returnLink={returnLink}/>
    <Header name={name} handleUpdateTemplate={handleUpdateTemplate}/>
  </div>
);

export default AppBar;