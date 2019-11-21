import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener";
import StagnantSelectionAreasListener from "./StagnantSelectionAreasListener";

const BottomRightActivityPane = ({ sheetGridRef }) => (
  <Fragment>
    <ActiveCellListener sheetGridRef={sheetGridRef}/>
    <ActiveSelectionAreaListener sheetGridRef={sheetGridRef}/>
    <StagnantSelectionAreasListener sheetGridRef={sheetGridRef}/>
  </Fragment>
);

export default BottomRightActivityPane;