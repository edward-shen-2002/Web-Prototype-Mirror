import React from "react";

import MenuItems from "../MenuItems";

import AcUnitIcon from "@material-ui/icons/AcUnit";

const File = ({ openedMenuName, handleClickMenu, handleHoverMenu }) => {
  const options = [
    {
      icon: <AcUnitIcon/>,
      label: "LABEL"
    }
  ];

  return (
    <MenuItems 
      openedMenuName={openedMenuName}
      label="File"
      options={options}
      handleClickMenu={handleClickMenu}
      handleHoverMenu={handleHoverMenu}
    />
  );
};

export default File;