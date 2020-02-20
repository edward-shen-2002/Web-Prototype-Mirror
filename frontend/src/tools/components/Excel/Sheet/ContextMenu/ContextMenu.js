import React, { useEffect, useState, Component } from "react";

import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu";

import "./ContextMenu.scss";

import uniqid from "uniqid";

const MenuIcon = ({ icon, mdiIcon }) => (
  <div className={`menuItem__icon ${mdiIcon ? mdiIcon : ""}`}>
    {!mdiIcon && icon}
  </div>
);

const MenuTextContent = ({
  text,
  command
}) => (
  <div className="menuItem__textContent">
    <div>{text}</div>
    <div>{command}</div>
  </div>
);

const SheetContextMenuItem = ({
  icon,
  mdiIcon,
  text,
  command,
  handleClick
}) => (
  <MenuItem className="menuItem" onClick={handleClick}>
    <MenuIcon icon={icon} mdiIcon={mdiIcon}/>
    <MenuTextContent text={text} command={command}/>
  </MenuItem>
);

const SubMenuContent = ({ item }) => (
  <SubMenu className="subMenu" title={item.text}>
    <GeneratedContextMenu config={item.children}/>
  </SubMenu>
);

const SubMenuContainer = ({ item }) => (
  <div className="subMenuContainer">
    <SubMenuContent item={item}/>
  </div>
);

const GeneratedContextMenu = ({ config }) => config.map((item) => {
  if(!item) return <hr key={uniqid()} className="menuDivider"/>;

  return (
    item.children
      ? <SubMenuContainer key={uniqid()} item={item}/>
      : <SheetContextMenuItem key={uniqid()} {...item}/>
  );
});

const ContextMenuContent = ({ config }) => (
  <ContextMenu 
    id="sheetWindowContainer" 
    className="contextMenu"
  >
    <GeneratedContextMenu config={config}/>
  </ContextMenu>
);

const SheetContextMenu = ({
  eventListenerRef
}) => {
  const [ config, setConfig ] = useState([]);

  useEffect(() => {
    if(!config.length) {
      const handleInsertRow = () => eventListenerRef.current.insertRow();
      const handleInsertColumn = () => eventListenerRef.current.insertColumn();
      const handleDeleteCellsShiftUp = () => eventListenerRef.current.deleteCellsShiftUp();
      const handleDeleteCellsShiftLeft = () => eventListenerRef.current.deleteCellsShiftLeft();
      const handleOpenCommentDialog = () => eventListenerRef.current.updateActiveCellDialog({ dialog: "comment" });
      const handleSetReadOnly = () => eventListenerRef.current.setReadOnly();
      const handleUnsetReadOnly = () => eventListenerRef.current.unsetReadOnly();
      const handleOpenAttributeDialog = () => eventListenerRef.current.updateActiveCellDialog({ dialog: "concept", type: "attribute" });
      const handleOpenCategoryDialog = () => eventListenerRef.current.updateActiveCellDialog({ dialog: "concept", type: "category" });
      const handleOpenPrepopulateDialog = () => eventListenerRef.current.updateActiveCellDialog({ dialog: "prepopulate" });
      const handleOpenCategoryGroupDialog = () => eventListenerRef.current.updateActiveCellDialog({ dialog: "group", type: "category" });
      // const handleOpenAttributeGroupDialog = () => eventListenerRef.updateActiveCellDialog({ dialog: "group", type: "attribute" });
  
      setConfig([
        // {
        //   mdiIcon: "mdi mdi-content-cut",
        //   text: "Cut",
        //   command: "Ctrl+X"
        // },
        // {
        //   mdiIcon: "mdi mdi-arrange-bring-forward",
        //   text: "Copy",
        //   command: "Ctrl+C"
        // },
        // {
        //   mdiIcon: "mdi mdi-clipboard",
        //   text: "Paste",
        //   command: "Ctrl+V"
        // },
        // null,
        {
          text: "Insert row",
          handleClick: handleInsertRow
        },
        {
          text: "Insert column",
          handleClick: handleInsertColumn
        },
        {
          text: "Delete cells",
          children: [
            {
              text: "Shift up",
              handleClick: handleDeleteCellsShiftUp
            },
            {
              text: "Shift left",
              handleClick: handleDeleteCellsShiftLeft
            }
          ]
        },
        null,
        {
          mdiIcon: "mdi mdi-comment",
          text: "Comment",
          command: "Ctrl+Alt+M",
          handleClick: handleOpenCommentDialog
        },
        null,
        {
          text: "Set read-only",
          handleClick: handleSetReadOnly
        },
        {
          text: "Unset read-only",
          handleClick: handleUnsetReadOnly
        },
        null,
        {
          text: "Set attribute",
          handleClick: handleOpenAttributeDialog
        },
        {
          text: "Set category",
          handleClick: handleOpenCategoryDialog
        },
        {
          text: "Set category group",
          handleClick: handleOpenCategoryGroupDialog
        },
        null,
        {
          text: "Set prepopulate",
          handleClick: handleOpenPrepopulateDialog
        }
      ]);
    } 
  });

  return <ContextMenuContent config={config}/>;
};

export default SheetContextMenu;
