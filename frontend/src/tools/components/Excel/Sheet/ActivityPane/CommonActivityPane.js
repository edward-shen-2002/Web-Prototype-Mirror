import React, { Fragment } from "react";

import ActiveCell from "./ActiveCell";
import ActiveSelectionArea from "./ActiveSelectionArea";
import StagnantSelectionAreas from "./StagnantSelectionAreas";

const CommonActivityPane = ({
  isActiveCellInCorrectPane,
  isRelevantArea,
  computeActiveCellStyle,
  computeSelectionAreaStyle,
  handleChangeActiveInputData,
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment
}) => (
  <Fragment>
    <ActiveCell
      computeActiveCellStyle={computeActiveCellStyle}
      isActiveCellInCorrectPane={isActiveCellInCorrectPane}
      handleChangeActiveInputData={handleChangeActiveInputData}
      handleCloseActiveCellDialog={handleCloseActiveCellDialog}
      handleChangeBusinessConcept={handleChangeBusinessConcept}
      handleAddComment={handleAddComment}
      handleDeleteComment={handleDeleteComment}
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