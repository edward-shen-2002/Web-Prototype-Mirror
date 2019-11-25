import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener";
import StagnantSelectionAreasListener from "./StagnantSelectionAreasListener";

const TopRightActivityPane = ({ sheetGridRef, handleChangeValue }) => (
  <Fragment>
    <ActiveCellListener sheetGridRef={sheetGridRef} handleChangeValue={handleChangeValue}/>
    <ActiveSelectionAreaListener sheetGridRef={sheetGridRef}/>
    <StagnantSelectionAreasListener sheetGridRef={sheetGridRef}/>
  </Fragment>
);

export default TopRightActivityPane;