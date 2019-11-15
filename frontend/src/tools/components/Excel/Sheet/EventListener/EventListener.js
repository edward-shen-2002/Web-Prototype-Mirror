import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

import { updateActiveCell } from "actions/ui/excel/activeCell";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";

// ! Possible optimizations? Don't use component? How would you keep ref?

const mapStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode } } }) => ({ selectionArea, isSelectionMode });

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea)),
  handleSetIsSelectionModeOn: () => dispatch(setSelectionModeOn()),
  handleSetIsSelectionModeOff: () => dispatch(setSelectionModeOff()),
  handleUpdateActiveCell: (activeCell) => dispatch(updateActiveCell(activeCell))
});

let EventListener = ({ 
  eventListenerRef, 
  selectionArea, 
  columnCount,
  rowCount,
  isSelectionMode,
  handleUpdateActiveCell,
  handleUpdateSelectionArea,
  handleSetIsSelectionModeOn,
  handleSetIsSelectionModeOff
}) => (
  <EventRedux 
    ref={eventListenerRef} 
    rowCount={rowCount}
    columnCount={columnCount}
    selectionArea={selectionArea}
    isSelectionMode={isSelectionMode}
    handleUpdateActiveCell={handleUpdateActiveCell}
    handleUpdateSelectionArea={handleUpdateSelectionArea}
    handleSetIsSelectionModeOn={handleSetIsSelectionModeOn}
    handleSetIsSelectionModeOff={handleSetIsSelectionModeOff}
  />
);

EventListener = connect(mapStateToProps, mapDispatchToProps)(EventListener);

export default EventListener;

class EventRedux extends PureComponent {
  constructor(props) {
    super(props);
  }

  moveUp() {
    const { selectionArea, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1--;

    if(y1 > 0) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveDown() {
    const { selectionArea, rowCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1++;
    
    if(y1 < rowCount) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveLeft() {
    const { selectionArea, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1--;

    if(x1 > 0) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveRight() {
    const { selectionArea, columnCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1++;

    if(x1 < columnCount) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  startSelectionArea(selectionArea) {
    const { isSelectionMode, handleUpdateSelectionArea, handleSetIsSelectionModeOn } = this.props;
    if(!isSelectionMode) handleSetIsSelectionModeOn();

    handleUpdateSelectionArea(selectionArea);
  }

  updateSelectionArea(selectionArea) {
    const { isSelectionMode, handleUpdateSelectionArea } = this.props;
    if(isSelectionMode) handleUpdateSelectionArea(selectionArea);
  }

  updateActiveCell(activeCell) {
    const { handleUpdateActiveCell } = this.props;
    handleUpdateActiveCell(activeCell);
  }

  setIsSelectionModeOn() {
    const { isSelectionMode, handleSetIsSelectionModeOn } = this.props;

    if(!isSelectionMode) handleSetIsSelectionModeOn();
  }

  setIsSelectionModeOff() {
    const { isSelectionMode, handleSetIsSelectionModeOff } = this.props;

    if(isSelectionMode) handleSetIsSelectionModeOff();
  }

  render() {
    return null;
  }
};