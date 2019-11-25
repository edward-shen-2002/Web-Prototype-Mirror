import React, { PureComponent } from "react";

import "./ActiveCell.scss";

const DEFAULT_ACTIVE_CELL_STYLE = { 
  display: "none", 
  left: 0, 
  top: 0, 
  width: 0, 
  height: 0 
};

const ActiveInputCell = ({ 
  activeCellStyle,
  x,
  y,
  handleChangeValue
}) => {
  const handleKeyDown = ({ key, target: { value } }) => {
    if(key === "Enter" || key === "Tab") {
      handleChangeValue(y, x, { value });
    }
  };

  return (
    <input className="activeCell activeCell--editMode" style={activeCellStyle} autoFocus onKeyDown={handleKeyDown}/>
  );
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
    const { x, y, handleChangeValue } = this.props;
    const { activeCellStyle, isNormalMode } = this.state;

    return (
      isNormalMode 
        ? <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
        : <ActiveInputCell activeCellStyle={activeCellStyle} x={x} y={y} handleChangeValue={handleChangeValue} autoFocus/>
    );
  }
};

export default ActiveCell;