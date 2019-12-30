import React from "react";

import MenuItems from "tools/components/Excel/commonComponents/MenuItems";

import SaveIcon from "@material-ui/icons/Save";

const File = ({ 
  openedMenuName, 

  handleClickMenu, 
  handleHoverMenu,

  eventListenerRef
}) => {
  const saveMenu = {
    icon: <SaveIcon/>,
    label: "Save",
    handleClick: () => eventListenerRef.current.save()
  };

  const options = [ saveMenu ];

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
