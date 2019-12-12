import React from "react";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import LowPriorityIcon from "@material-ui/icons/LowPriority";

import "./ToolBar.scss";

const ToolBarButton = ({ children, handleClick }) => (
  <Button 
    disableRipple={true} 
    disableFocusRipple={true}
    onClick={handleClick}
  >
    {children}
  </Button>
);

const TemplateIdMappingTool = ({ handleClick }) => (
  <ToolBarButton handleClick={handleClick}>
    <LowPriorityIcon/>
  </ToolBarButton>
);

let TemplateToolBarSection = () => {
  const handleClickTemplateIdMappingTool = () => {

  };

  return (
    <div>
      <TemplateIdMappingTool handleClick={handleClickTemplateIdMappingTool}/>
    </div>
  );
};

TemplateToolBarSection = connect(null)(TemplateToolBarSection);

const ToolBar = ({
  type
}) => {

  return (
    <div className="toolBar">

      {type === "template" && <TemplateToolBarSection/>}
    </div>
  );
};

export default ToolBar;