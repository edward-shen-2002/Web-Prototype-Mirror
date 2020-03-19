import React from "react";

import { Link } from "react-router-dom";

// import { toggleTemplatePublish } from "@actions/ui/excel/isTemplatePublished";

import Button from "@material-ui/core/Button";

import FileTableOutline from "mdi-material-ui/FileTableOutline"; 
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

import Title from "./Title";

import Menu from "./Menu";

import "./AppBar.scss";

const ExcelIconButton = () => (
  <Button>
    <FileTableOutline className="excelIconButton__icon"/>
  </Button>
);

const ExcelReturnButton = ({ returnLink }) => (
  <Link to={returnLink} className="excelIconButton">
   <ExcelIconButton/>
  </Link>
);

/**
 * The header of the workbook, which contains the title (?and related actions)
 */
const Header = ({ 
  name
}) => (
  <div>
    <Title name={name}/>
    <Menu/>
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

// const SideOptions = ({ 
//   type,
//   isTemplatePublished,
//   handleTogglePublish
// }) => (
//   <div className="appBarSide">
//     {type === "template" && <TemplateOptions isTemplatePublished={isTemplatePublished} handleTogglePublish={handleTogglePublish}/>}
//   </div>
// );

const MainAppBarOptions = ({ returnLink }) => (
  <div className="appBarMain">
    <ExcelReturnButton returnLink={returnLink}/>
    <Header/>
  </div>
);

const AppBar = ({ type, returnLink }) => (
  <div className="appBarContainer">
    <MainAppBarOptions returnLink={returnLink} />
    {/* <SideOptions type={type}/> */}
  </div>
);

export default AppBar;