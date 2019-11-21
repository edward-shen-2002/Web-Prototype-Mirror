import React, { Fragment } from "react";

import ActiveCellListener from "./ActivityCellListener";

const TopRightActivityPane = ({ sheetGridRef }) => (
  <Fragment>
    <ActiveCellListener sheetGridRef={sheetGridRef}/>
  </Fragment>
);

export default TopRightActivityPane;