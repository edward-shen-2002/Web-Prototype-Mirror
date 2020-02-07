import React, { Fragment } from "react";

import ActiveCell from "./ActiveCell";
import ActiveSelectionArea from "./ActiveSelectionArea";
import StagnantSelectionAreas from "./StagnantSelectionAreas";

const CommonActivityPane = ({
  isActiveCellInCorrectPane,
  isRelevantArea,
  computeActiveCellStyle,
  computeSelectionAreaStyle,
  eventListenerRef
}) => (
  <Fragment>
    <ActiveCell
      computeActiveCellStyle={computeActiveCellStyle}
      isActiveCellInCorrectPane={isActiveCellInCorrectPane}
      eventListenerRef={eventListenerRef}
    />
    <ActiveSelectionArea
      isRelevantArea={isRelevantArea}
      computeSelectionAreaStyle={computeSelectionAreaStyle}
    />
    <StagnantSelectionAreas
      isRelevantArea={isRelevantArea}
      computeSelectionAreaStyle={computeSelectionAreaStyle}
    />
  </Fragment>
);

export default CommonActivityPane;