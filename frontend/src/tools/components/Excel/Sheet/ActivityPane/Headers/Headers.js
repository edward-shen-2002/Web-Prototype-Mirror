import React from "react";

import { connect } from "react-redux";

import "./Headers.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetsCellOffsets
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetCellOffset: sheetsCellOffsets[activeSheetName]
});

let HeaderSelection = ({ 
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas, 
  stagnantSelectionAreas 
}) => {
  
};

HeaderSelection = connect(mapStateToProps)(HeaderSelection);

export default HeaderSelection;