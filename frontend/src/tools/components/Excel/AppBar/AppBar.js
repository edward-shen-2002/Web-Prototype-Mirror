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
const Header = ({ name, handleSubmitName }) => (
  <div>
    <Title name={name} handleSubmitName={handleSubmitName}/>
    <Menu/>
  </div>
);

const AppBar = ({ name, returnLink, handleSubmitName }) => (
  <div className="appBar">
    <ExcelIconButton returnLink={returnLink}/>
    <Header name={name} handleSubmitName={handleSubmitName}/>
  </div>
);

export default AppBar;