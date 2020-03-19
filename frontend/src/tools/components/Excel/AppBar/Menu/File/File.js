import React from "react";

import { useSelector } from "react-redux";

import MenuItems from "@tools/components/Excel/commonComponents/MenuItems";

import SaveIcon from "@material-ui/icons/Save";

import GetAppIcon from "@material-ui/icons/GetApp";

const File = ({ 
  openedMenuName, 

  handleClickMenu, 
  handleHoverMenu
}) => {
  const {

  } = useSelector(({
    
  }) => ({

  }));

  const saveMenu = {
    icon: <SaveIcon/>,
    label: "Save",
    handleClick: () => eventListenerRef.current.save()
  };

  const downloadMenu = {
    icon: <GetAppIcon/>,
    label: "Download",
    handleClick: () => eventListenerRef.current.download()
  }

  const options = [ saveMenu, downloadMenu ];

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
