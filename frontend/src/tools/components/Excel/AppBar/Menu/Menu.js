import React, { useState } from "react";

import File from "./File";
import Edit from "./Edit";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Menu = ({ eventListenerRef }) => {
  const [ isMenuOpenable, setIsMenuOpenable ] = useState(false);
  const [ openedMenuName, setOpenedMenuName ] = useState(null);

  const handleHoverMenu = (menuName) => {
    if(isMenuOpenable) setOpenedMenuName(menuName);
  };

  const handleClickMenu = (menuName) => {
    if(isMenuOpenable) {
      setIsMenuOpenable(false);
      if(openedMenuName) setOpenedMenuName(null);
    } else {
      setIsMenuOpenable(true);
      setOpenedMenuName(menuName);
    }
  };

  const handleClickAway = () => {
    if(isMenuOpenable) setIsMenuOpenable(false);
    if(openedMenuName) setOpenedMenuName(null);
  };

  const commonMenuItemProps = { openedMenuName, handleClickMenu, handleHoverMenu };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="appBarMain__menu">
        <File eventListenerRef={eventListenerRef} {...commonMenuItemProps}/>
        <Edit {...commonMenuItemProps}/>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;