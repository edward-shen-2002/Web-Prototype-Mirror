import React, { Component, Fragment } from "react";

import "./ActivityPane.scss";

class ActivityPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionAreaStyle: { display: "none", left: 0, top: 0, width: 0, height: 0 },
      activeCellStyle: { display: "none", left: 0, top: 0, width: 0, height: 0 },
      isEditMode: false
    };
  }

  updateSelectionAreaStyle(selectionAreaStyle) {
    this.setState({ selectionAreaStyle });
  }
  
  updateActiveCellStyle(activeCellStyle, isEditMode) {   
    this.setState({ activeCellStyle, isEditMode });
  }

  resetSelectionArea() {
    if(this.state.selectionAreaStyle.width || this.state.selectionAreaStyle.height) {
      this.setState({ selectionAreaStyle: { display: "none", top: 0, left: 0, width: 0, height: 0 } });
    }
  }

  resetActiveCell() {
    if(this.state.activeCellStyle.width || this.state.activeCellStyle.height) {
      this.setState({ isEditMode: false, activeCellStyle: { display: "none", top: 0, left: 0, width: 0, height: 0 } });
    }
  }
  
  render() {
    const { activeCellStyle, selectionAreaStyle, isEditMode } = this.state;

    return (
      <Fragment>
        <div className="selectionArea" style={selectionAreaStyle}/>
        {
          isEditMode 
            ? <input className="activeCell activeCell--editMode" type="text" style={activeCellStyle} autoFocus/>
            : <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
        }
      </Fragment>
    );
  }
}

export default ActivityPane;