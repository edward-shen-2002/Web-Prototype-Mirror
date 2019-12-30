import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { adminTemplateRoleAxios } from "tools/rest";

import { toggleTemplatePublish } from "actions/ui/excel/isTemplatePublished";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import Title from "./Title";

import Menu from "./Menu";

import { REST_ADMIN_TEMPLATES } from "constants/rest";

import "./AppBar.scss";

const handleUpdateTemplate = (newTemplate) => (
  adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${_id}`, { newTemplate })
    .then(() => {
      // Update 
    })
    .catch((error) => console.error(error))
);

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

let TemplateOptions = ({ eventListenerRef, isTemplatePublished, handleTogglePublish }) => {
  const handleImportId = () => eventListenerRef.current.importId();

  const importIDStyle = { marginRight: 8, minWidth: 140 };
  const publishStyle = { minWidth: 140 };

  return (
    <div>
      <PlaylistAddIconButton buttonStyle={importIDStyle} text="Import IDs" handleClick={handleImportId}/>
      <DoubleArrowIconButton buttonStyle={publishStyle} text={isTemplatePublished ? "Unpublish" : "Publish"} handleClick={handleTogglePublish}/>
    </div>
  );
};

const mapTemplateDispatchToProps = (dispatch) => ({
  handleTogglePublish: () => dispatch(toggleTemplatePublish())
});

const mapTemplateStateToProps = ({
  ui: {
    excel: {
      type,
      isTemplatePublished
    }
  }
}) => ({
  type,
  isTemplatePublished
});

let SideOptions = ({ 
  eventListenerRef,
  type,
  isTemplatePublished,
  handleTogglePublish
}) => (
  <div className="appBarSide">
    {type === "template" && <TemplateOptions eventListenerRef={eventListenerRef} isTemplatePublished={isTemplatePublished} handleTogglePublish={handleTogglePublish}/>}
  </div>
);

SideOptions = connect(mapTemplateStateToProps, mapTemplateDispatchToProps)(SideOptions);

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
  eventListenerRef,
  name, 
  type,
  returnLink, 
  templateData,
  handleUpdateTemplate
}) => (
  <div className="appBarContainer">
    <MainAppBarOptions 
      name={name} 
      returnLink={returnLink} 
      handleUpdateTemplate={handleUpdateTemplate}
    />
    <SideOptions 
      eventListenerRef={eventListenerRef}
      type={type} 
      templateData={templateData} 
      handleUpdateTemplate={handleUpdateTemplate}
    />
  </div>
);

export default AppBar;