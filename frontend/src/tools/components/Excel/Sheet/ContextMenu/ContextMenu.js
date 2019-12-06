import React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { MenuOptions } from "tools/components/Excel/commonComponents/MenuItems";

const ContextMenu = () => {

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MenuItems/>
      </div>
    </ClickAwayListener>
  );
};

export default ContextMenu;