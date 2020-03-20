import React, { useCallback } from "react";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Link } from "react-router-dom";

import { toggleTemplatePublish } from "@actions/ui/excel/commands";

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

let TemplateOptions = () => {
  const dispatch = useDispatch();

  const isTemplatePublished = useSelector(
    ({
      ui: {
        excel: {
          isTemplatePublished
        }
      }
    }) => isTemplatePublished,
    shallowEqual
  );

  const publishStyle = { minWidth: 140 };

  const togglePublish = useCallback(
    () => dispatch(toggleTemplatePublish()),
    [ dispatch ]
  );

  return (
    <div>
      <DoubleArrowIconButton buttonStyle={publishStyle} text={isTemplatePublished ? "Unpublish" : "Publish"} handleClick={togglePublish}/>
    </div>
  );
};

const SideOptions = ({ type }) => (
  <div className="appBarSide">
    {type === "template" && <TemplateOptions/>}
  </div>
);

const MainAppBarOptions = ({ returnLink }) => (
  <div className="appBarMain">
    <ExcelReturnButton returnLink={returnLink}/>
    <Header/>
  </div>
);

const AppBar = ({ type, returnLink }) => (
  <div className="appBarContainer">
    <MainAppBarOptions returnLink={returnLink} />
    <SideOptions type={type}/>
  </div>
);

export default AppBar;