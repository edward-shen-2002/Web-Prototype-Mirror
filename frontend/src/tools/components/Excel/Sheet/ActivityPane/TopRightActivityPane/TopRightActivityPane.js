import React, { Fragment } from "react";

import ActiveCellListener from "./ActiveCellListener";
import ActiveSelectionAreaListener from "./ActiveSelectionAreaListener";
import StagnantSelectionAreasListener from "./StagnantSelectionAreasListener";

const TopRightActivityPane = ({ handleChangeActiveInputValue }) => (
  <Fragment>
    <ActiveCellListener 
      handleChangeActiveInputValue={handleChangeActiveInputValue}
    />
    <ActiveSelectionAreaListener/>
    <StagnantSelectionAreasListener/>
  </Fragment>
);

export default TopRightActivityPane;