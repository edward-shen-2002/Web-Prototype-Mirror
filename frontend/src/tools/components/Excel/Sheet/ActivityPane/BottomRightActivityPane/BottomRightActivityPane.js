import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";

const BottomRightActivityPane = ({ sheetGridRef }) => {
  
  return (
    <Fragment>
      <ActiveCellListener sheetGridRef={sheetGridRef}/>
    </Fragment>
  );
};

export default BottomRightActivityPane;