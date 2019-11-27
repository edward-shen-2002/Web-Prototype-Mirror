import React, { PureComponent } from "react";

import { connect } from "react-redux";

import "./ActiveCell.scss";

const DEFAULT_ACTIVE_CELL_STYLE = { 
  display: "none", 
  left: 0, 
  top: 0, 
  width: 0, 
  height: 0 
};

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputValue,
      activeCellInputAutoFocus
    }
  }
}) => ({
  activeCellInputValue,
  activeCellInputAutoFocus
});

let ActiveInputCell = ({ 
  activeCellStyle,
  activeCellInputValue,
  activeCellInputAutoFocus,
  handleChangeActiveInputValue
}) => {
  const handleChangeInputValue = ({ target: { value } }) => handleChangeActiveInputValue(value);

  return (
    <input 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle} 
      value={activeCellInputValue}
      onChange={handleChangeInputValue}
      autoFocus={activeCellInputAutoFocus}
    />
  );
};

ActiveInputCell = connect(mapStateToProps)(ActiveInputCell);

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
    const { handleChangeActiveInputValue } = this.props;
    const { activeCellStyle, isNormalMode } = this.state;

    return (
      isNormalMode 
        ? <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
        : <ActiveInputCell 
            activeCellStyle={activeCellStyle} 
            handleChangeActiveInputValue={handleChangeActiveInputValue}
          />
    );
  }
};

export default ActiveCell;