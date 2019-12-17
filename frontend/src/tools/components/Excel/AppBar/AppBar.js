import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

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

const DoubleArrowIconButton = ({ buttonStyle, text, handleClick }) => (
  <Button style={buttonStyle} variant="contained" color="primary" onClick={handleClick}>
    <DoubleArrowIcon/>
    {text}
  </Button>
);

const PlaylistAddIconButton = ({ buttonStyle, text, handleClick }) => (
  <Button style={buttonStyle} variant="contained" color="primary" onClick={handleClick}>
    <PlaylistAddIcon/>
    {text}
  </Button>
);

const mapStateToProps = ({
  ui: {
    excel: {
      
    }
  }
}) => ({

});

let TemplateOptions = ({ templateData: { published }, handleUpdateTemplate }) => {
  const handleToggleTemplatePublish = () => handleUpdateTemplate({ published: !published });

  const importIDStyle = { marginRight: 8, minWidth: 140 };
  const publishStyle = { minWidth: 140 };

  return (
    <div>
      <PlaylistAddIconButton buttonStyle={importIDStyle} text="Import IDs"/>
      <DoubleArrowIconButton buttonStyle={publishStyle} text={published ? "Unpublish" : "Publish"} handleClick={handleToggleTemplatePublish}/>
    </div>
  );
};



const SideOptions = ({ type, templateData, handleUpdateTemplate } ) => (
  <div className="appBarSide">
    {type === "template" && <TemplateOptions templateData={templateData} handleUpdateTemplate={handleUpdateTemplate}/>}
  </div>
);

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