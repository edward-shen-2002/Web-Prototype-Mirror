import React, { PureComponent } from "react";

import "./ActiveSelectionArea.scss";

const DEFAULT_ACTIVE_SELECTION_AREA_STYLE = { 
  display: "none", 
  left: 0, 
  top: 0, 
  width: 0, 
  height: 0 
};

class ActiveSelectionArea extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSelectionAreaStyle: DEFAULT_ACTIVE_SELECTION_AREA_STYLE
    };
  }

  resetActiveSelectionArea() {
    const { activeSelectionAreaStyle: { width, height } } = this.state;

    if(width || height) this.setState({ activeSelectionAreaStyle: DEFAULT_ACTIVE_SELECTION_AREA_STYLE });
  }

  setActiveSelectionAreaStyle(activeSelectionAreaStyle) {
    this.setState({ activeSelectionAreaStyle });
  }

  render() {
    const { activeSelectionAreaStyle } = this.state;

    return (
      <div className="activeSelectionArea" style={activeSelectionAreaStyle}/>
    );
  }
}

export default ActiveSelectionArea;