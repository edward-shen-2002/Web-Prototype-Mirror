import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

import { updateActiveCell } from "actions/ui/excel/activeCell";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";

// ! Possible optimizations? Don't use component? How would you keep ref?

const mapStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode, isEditMode } } }) => ({ selectionArea, isSelectionMode, isEditMode });

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea)),
  
  handleSetSelectionModeOn: () => dispatch(setSelectionModeOn()),
  handleSetSelectionModeOff: () => dispatch(setSelectionModeOff()),

  handleUpdateActiveCell: (activeCell) => dispatch(updateActiveCell(activeCell)),

  handleSetEditModeOn: () => dispatch(setEditModeOn()),
  handleSetEditModeOff: () => dispatch(setEditModeOff())
});

let EventListener = ({ 
  eventListenerRef, 
  selectionArea, 
  columnCount,
  rowCount,
  isSelectionMode,

  isEditMode,

  handleUpdateActiveCell,

  handleUpdateSelectionArea,

  handleSetSelectionModeOn,
  handleSetSelectionModeOff,

  handleSetEditModeOn,
  handleSetEditModeOff
}) => (
  <EventRedux 
    ref={eventListenerRef} 
    rowCount={rowCount}
    columnCount={columnCount}
    selectionArea={selectionArea}
    isSelectionMode={isSelectionMode}
    isEditMode={isEditMode}

    handleUpdateActiveCell={handleUpdateActiveCell}
    handleUpdateSelectionArea={handleUpdateSelectionArea}
    
    handleSetSelectionModeOn={handleSetSelectionModeOn}
    handleSetSelectionModeOff={handleSetSelectionModeOff}

    handleSetEditModeOn={handleSetEditModeOn}
    handleSetEditModeOff={handleSetEditModeOff}
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
    const { isSelectionMode, handleUpdateSelectionArea, handleSetSelectionModeOn } = this.props;
    if(!isSelectionMode) handleSetSelectionModeOn();

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
    const { isSelectionMode, handleSetSelectionModeOn } = this.props;

    if(!isSelectionMode) handleSetSelectionModeOn();
  }

  setIsSelectionModeOff() {
    const { isSelectionMode, handleSetSelectionModeOff } = this.props;

    if(isSelectionMode) handleSetSelectionModeOff();
  }

  setEditModeOn() {
    const { isEditMode, handleSetEditModeOn } = this.props;
    if(!isEditMode) handleSetEditModeOn();
  }

  setEditModeOff() {
    const { isEditMode, handleSetEditModeOff } = this.props;

    if(isEditMode) handleSetEditModeOff();
  }

  render() {
    return null;
  }
};