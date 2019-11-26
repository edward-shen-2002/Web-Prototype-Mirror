import React, { useState } from "react";

import File from "./File";
import Edit from "./Edit";

const Menu = () => {
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

  const handleBlurMenuContainer = () => {
    if(isMenuOpenable) setIsMenuOpenable(false);
    if(openedMenuName) setOpenedMenuName(null);
  };

  return (
    <div className="appBar__menu" onBlur={handleBlurMenuContainer}>
      <File openedMenuName={openedMenuName} handleClickMenu={handleClickMenu} handleHoverMenu={handleHoverMenu}/>
      <Edit openedMenuName={openedMenuName} handleClickMenu={handleClickMenu} handleHoverMenu={handleHoverMenu}/>
    </div>
  );
};

export default Menu;