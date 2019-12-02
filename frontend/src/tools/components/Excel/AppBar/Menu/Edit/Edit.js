import React from "react";

import MenuItems from "../MenuItems";

import AcUnitIcon from "@material-ui/icons/AcUnit";

const Edit = ({ openedMenuName, handleClickMenu, handleHoverMenu }) => {
  const options = [
    {
      icon: <AcUnitIcon/>,
      label: "LABEL"
    }
  ];

  return (
    <MenuItems 
      openedMenuName={openedMenuName}
      label="Edit"
      options={options}
      handleClickMenu={handleClickMenu}
      handleHoverMenu={handleHoverMenu}
    />
  );
};

export default Edit;