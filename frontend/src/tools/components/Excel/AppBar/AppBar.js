import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { toggleTemplatePublish } from "@actions/ui/excel/isTemplatePublished";

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
const Header = ({ 
  name, 
  eventListenerRef 
}) => (
  <div>
    <Title name={name}/>
    <Menu eventListenerRef={eventListenerRef}/>
  </div>
);

const DoubleArrowIconButton = ({ buttonStyle, text, handleClick }) => (
  <Button style={buttonStyle} variant="contained" color="primary" onClick={handleClick}>
    <DoubleArrowIcon/>
    {text}
  </Button>
);

let TemplateOptions = ({  
  isTemplatePublished, 
  handleTogglePublish 
}) => {
  const publishStyle = { minWidth: 140 };

  return (
    <div>
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
  type,
  isTemplatePublished,
  handleTogglePublish,
  eventListenerRef
}) => (
  <div className="appBarSide">
    {type === "template" && <TemplateOptions eventListenerRef={eventListenerRef} isTemplatePublished={isTemplatePublished} handleTogglePublish={handleTogglePublish}/>}
  </div>
);

SideOptions = connect(mapTemplateStateToProps, mapTemplateDispatchToProps)(SideOptions);

const MainAppBarOptions = ({
  returnLink,
  eventListenerRef
}) => (
  <div className="appBarMain">
    <ExcelIconButton returnLink={returnLink}/>
    <Header 
      eventListenerRef={eventListenerRef}
    />
  </div>
);

const AppBar = ({ 
  eventListenerRef,
  type,
  returnLink,
}) => (
  <div className="appBarContainer">
    <MainAppBarOptions  
      returnLink={returnLink} 
      eventListenerRef={eventListenerRef}
    />
    <SideOptions 
      eventListenerRef={eventListenerRef}
      type={type}
    />
  </div>
);

export default AppBar;