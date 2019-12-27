import React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { MenuOptions } from "tools/components/Excel/commonComponents/MenuItems";

import "./ContextMenu.scss";

let ContextMenu = ({ 
  isOpen, 
  anchorEl,
  handleCloseContextMenu
}) => {
  const test = {
    // icon: null,
    label: "Save",
    handleClick: () => {
    }
  };
  const options = [ test ];

  return (
      <ClickAwayListener onClickAway={handleCloseContextMenu}>
        <div className="contextMenu">
          <MenuOptions 
            isOpen={isOpen} 
            anchorEl={anchorEl} 
            options={options}
          />
        </div>
      </ClickAwayListener>
  );
};

export default ContextMenu;