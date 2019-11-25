import React from "react";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 

import Title from "./Title";

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
const ExcelHeader = ({ name, handleSubmitName }) => (
  <div>
    <Title name={name} handleSubmitName={handleSubmitName}/>
  </div>
);

const ExcelAppBar = ({ name, returnLink, handleSubmitName }) => (
  <div className="excelAppBar">
    <ExcelIconButton returnLink={returnLink}/>
    <ExcelHeader name={name} handleSubmitName={handleSubmitName}/>
  </div>
);

export default ExcelAppBar;