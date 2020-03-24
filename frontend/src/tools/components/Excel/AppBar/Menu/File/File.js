import React, { useMemo } from "react";

import { useDispatch } from "react-redux";

import MenuItems from "@tools/components/Excel/commonComponents/MenuItems";

import SaveIcon from "@material-ui/icons/Save";

import GetAppIcon from "@material-ui/icons/GetApp";

import {
  save,
  download
} from "@actions/ui/excel/commands";

const File = ({ 
  openedMenuName, 

  handleClickMenu, 
  handleHoverMenu
}) => {
  const dispatch = useDispatch();

  const options = useMemo(
    () => [ 
      {
        icon: <SaveIcon/>,
        label: "Save",
        handleClick: () => dispatch(save())
      },
      {
        icon: <GetAppIcon/>,
        label: "Download",
        handleClick: () => dispatch(download())
      }
    ],
    [ dispatch ]
  );

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
