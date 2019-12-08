import React from "react";

import { connect } from "react-redux";

import MenuItems from "tools/components/Excel/commonComponents/MenuItems";

import SaveIcon from "@material-ui/icons/Save";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetsCellData,
      sheetsColumnCount,
      sheetsColumnWidths,
      sheetsFreezeColumnCount,
      sheetsRowCount,
      sheetsRowHeights,
      sheetsFreezeRowCount,
      sheetsHiddenColumns,
      sheetsHiddenRows
    }
  }
}) => ({
  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount,
  sheetsHiddenColumns,
  sheetsHiddenRows
});

let File = ({ 
  openedMenuName, 

  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount,
  sheetsHiddenColumns,
  sheetsHiddenRows,

  handleClickMenu, 
  handleHoverMenu,

  handleSaveWorkbook
}) => {
  const saveMenu = {
    icon: <SaveIcon/>,
    label: "Save",
    handleClick: async () => {
      handleSaveWorkbook({
        activeSheetName,
        sheetNames,
        activeCellPosition,
        sheetsCellData,
        sheetsColumnCount,
        sheetsColumnWidths,
        sheetsFreezeColumnCount,
        sheetsRowCount,
        sheetsRowHeights,
        sheetsFreezeRowCount,
        sheetsHiddenColumns,
        sheetsHiddenRows
      });
    }
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

File = connect(mapStateToProps)(File);

export default File;
