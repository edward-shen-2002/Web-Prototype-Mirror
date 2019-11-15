import React, { Fragment } from "react";

import { connect } from "react-redux";

import { setSelectionModeOff } from "actions/ui/excel/isSelectionMode";

const mapStateToProps = ({ ui: { excel: { isSelectionMode } } }) => ({ isSelectionMode });
const mapDispatchToProps = (dispatch) => ({
  handleSetSelectionModeOff: () => dispatch(setSelectionModeOff())
}); 

let EventListener = ({ isSelectionMode, handleSetSelectionModeOff }) => {
  window.onmouseup = () => {
    if(isSelectionMode) handleSetSelectionModeOff();
  };

  return <Fragment/>;
};

EventListener = connect(mapStateToProps, mapDispatchToProps)(EventListener);

export default EventListener;