import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener"

const BottomRightActivityPane = ({ sheetGridRef }) => (
  <Fragment>
    <ActiveCellListener sheetGridRef={sheetGridRef}/>
    <ActiveSelectionAreaListener sheetGridRef={sheetGridRef}/>
  </Fragment>
);

export default BottomRightActivityPane;