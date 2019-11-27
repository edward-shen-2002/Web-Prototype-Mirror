import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener";
import StagnantSelectionAreasListener from "./StagnantSelectionAreasListener";

const TopRightActivityPane = ({ sheetGridRef, handleChangeActiveInputValue }) => (
  <Fragment>
    <ActiveCellListener 
      sheetGridRef={sheetGridRef} 
      handleChangeActiveInputValue={handleChangeActiveInputValue}
    />
    <ActiveSelectionAreaListener sheetGridRef={sheetGridRef}/>
    <StagnantSelectionAreasListener sheetGridRef={sheetGridRef}/>
  </Fragment>
);

export default TopRightActivityPane;