import React from "react";

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

const ToolBar = ({
  type
}) => {

  return (
    <div className="toolBar">

    </div>
  );
};

export default ToolBar;