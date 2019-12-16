import React from "react";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

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

const DoubleArrowIconButton = ({ text, handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    <DoubleArrowIcon/>
    {text}
  </Button>
);

const SideOptions = ({ type, templateData: { published }, handleUpdateTemplate } ) => {
  const handleToggleTemplatePublish = () => handleUpdateTemplate({ published: !published });

  return (
    <div className="appBarSide">
      {type === "template" && <DoubleArrowIconButton text={published ? "Unpublish" : "Publish"} handleClick={handleToggleTemplatePublish}/>}
    </div>
  );
};

const MainAppBarOptions = ({
  name,
  returnLink,
  handleUpdateTemplate
}) => (
  <div className="appBarMain">
    <ExcelIconButton returnLink={returnLink}/>
    <Header name={name} handleUpdateTemplate={handleUpdateTemplate}/>
  </div>
);

const AppBar = ({ 
  name, 
  type,
  returnLink, 
  templateData,
  handleUpdateTemplate
}) => (
  <div className="appBarContainer">
    <MainAppBarOptions name={name} returnLink={returnLink} handleUpdateTemplate={handleUpdateTemplate}/>
    <SideOptions type={type} templateData={templateData} handleUpdateTemplate={handleUpdateTemplate}/>
  </div>
);

export default AppBar;