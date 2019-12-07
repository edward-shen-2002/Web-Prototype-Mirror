import React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { MenuOptions } from "tools/components/Excel/commonComponents/MenuItems";

const ContextMenu = () => {

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MenuOptions />
      </div>
    </ClickAwayListener>
  );
};

export default ContextMenu;