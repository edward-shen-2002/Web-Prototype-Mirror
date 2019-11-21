import React, { PureComponent } from "react";

import "./ActiveCell.scss";

const DEFAULT_ACTIVE_CELL_STYLE = { 
  display: "none", 
  left: 0, 
  top: 0, 
  width: 0, 
  height: 0 
};

class ActiveCell extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCellStyle: DEFAULT_ACTIVE_CELL_STYLE,
      isNormalMode: true
    };
  }

  resetActiveCell() {
    const { activeCellStyle: { width, height }, isNormalMode } = this.state;

    if(width || height || !isNormalMode) this.setState({ activeCellStyle: DEFAULT_ACTIVE_CELL_STYLE, isNormalMode: true });
  }

  setEditMode() {
    if(this.state.isNormalMode) this.setState({ isNormalMode: false });
  }

  setNormalMode() {
    if(this.state.isNormalMode) this.setState({ isNormalMode: true });
  }

  setActiveCellStyle(activeCellStyle) {
    this.setState({ activeCellStyle });
  }

  setActiveCell(state) {
    this.setState(state);
  }

  render() {
    const { activeCellStyle, isNormalMode } = this.state;
    return (
      isNormalMode 
        ? <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
        : <input className="activeCell activeCell--editMode" style={activeCellStyle} autoFocus/>
    );
  }
};

export default ActiveCell;