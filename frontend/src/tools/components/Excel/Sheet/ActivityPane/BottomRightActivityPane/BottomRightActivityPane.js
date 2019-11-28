import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener";
import StagnantSelectionAreasListener from "./StagnantSelectionAreasListener";

const BottomRightActivityPane = ({ sheetGridRef, handleChangeActiveInputValue }) => (
  <Fragment>
    <ActiveCellListener 
      handleChangeActiveInputValue={handleChangeActiveInputValue}
      sheetGridRef={sheetGridRef}
    />
    <ActiveSelectionAreaListener/>
    <StagnantSelectionAreasListener/>
  </Fragment>
);

export default BottomRightActivityPane;