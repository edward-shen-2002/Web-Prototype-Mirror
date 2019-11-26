import React from "react";

import Menu from "../Menu";

import AcUnitIcon from "@material-ui/icons/AcUnit";

const View = ({ openedMenuName, handleClickMenu, handleHoverMenu }) => {
  const options = [
    {
      icon: <AcUnitIcon/>,
      label: "LABEL"
    }
  ];

  return (
    <Menu 
      openedMenuName={openedMenuName}
      label="View"
      options={options}
      handleClickMenu={handleClickMenu}
      handleHoverMenu={handleHoverMenu}
    />
  );
};

export default View;