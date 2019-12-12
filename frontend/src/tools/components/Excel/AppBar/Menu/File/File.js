import React from "react";

import { connect } from "react-redux";

import MenuItems from "tools/components/Excel/commonComponents/MenuItems";

import SaveIcon from "@material-ui/icons/Save";

import { extractReactAndWorkbookState } from "tools/excel";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetHiddenColumns,
      sheetHiddenRows
    }
  }
}) => ({
  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetCellData,
  sheetColumnCount,
  sheetColumnWidths,
  sheetFreezeColumnCount,
  sheetRowCount,
  sheetRowHeights,
  sheetFreezeRowCount,
  sheetHiddenColumns,
  sheetHiddenRows
});

let File = ({ 
  openedMenuName, 

  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetCellData,
  sheetColumnCount,
  sheetColumnWidths,
  sheetFreezeColumnCount,
  sheetRowCount,
  sheetRowHeights,
  sheetFreezeRowCount,
  sheetHiddenColumns,
  sheetHiddenRows,

  handleClickMenu, 
  handleHoverMenu,

  handleUpdateTemplate
}) => {
  const saveMenu = {
    icon: <SaveIcon/>,
    label: "Save",
    handleClick: () => {
      handleUpdateTemplate({
        fileStates: extractReactAndWorkbookState({
          activeSheetName,
          sheetNames,
          activeCellPosition,
          sheetCellData,
          sheetColumnCount,
          sheetColumnWidths,
          sheetFreezeColumnCount,
          sheetRowCount,
          sheetRowHeights,
          sheetFreezeRowCount,
          sheetHiddenColumns,
          sheetHiddenRows
        })
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
