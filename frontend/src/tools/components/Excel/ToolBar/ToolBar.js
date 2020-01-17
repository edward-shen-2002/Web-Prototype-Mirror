import React from "react";

import { connect } from "react-redux";

import { openTemplateIdMappingDialog } from "@actions/ui/excel/isTemplateIdMappingDialogOpen";

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

const mapTemplateDispatchToProps = (dispatch) => ({
  handleOpenTemplateIdMappingDialog: () => dispatch(openTemplateIdMappingDialog())
});

let TemplateToolBarSection = ({
  handleOpenTemplateIdMappingDialog
}) => {

  return (
    <div>
      <TemplateIdMappingTool handleClick={handleOpenTemplateIdMappingDialog}/>
    </div>
  );
};

TemplateToolBarSection = connect(null, mapTemplateDispatchToProps)(TemplateToolBarSection);

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