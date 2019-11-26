import React from "react";

import { connect } from "react-redux";

import { getWorkbookInstance } from "tools/excel";

import MenuItems from "../MenuItems";

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
      sheetsFreezeRowCount
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
  sheetsFreezeRowCount
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

  handleClickMenu, 
  handleHoverMenu,

  handleSaveWorkbook
}) => {
  const saveMenu = {
    icon: <SaveIcon/>,
    label: "Save",
    handleClick: async () => {
      let Workbook = await getWorkbookInstance({
        activeSheetName,
        sheetNames,
        activeCellPosition,
        sheetsCellData,
        sheetsColumnCount,
        sheetsColumnWidths,
        sheetsFreezeColumnCount,
        sheetsRowCount,
        sheetsRowHeights,
        sheetsFreezeRowCount
      });

      // Output the file
      const workbookData = await Workbook.outputAsync("base64");
      
      handleSaveWorkbook(workbookData);
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
