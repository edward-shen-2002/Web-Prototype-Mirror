import React, { useState } from "react";

import { connect } from "react-redux";

const RowDragger = ({
  row,
  handleRowDragStart
}) => {
  const [ isIndicatorActive, setIsIndicatorActive ] = useState(false);

  const handleMouseEnter = () => {
    setIsIndicatorActive(true);
  };

  const handleMouseLeave = () => {
    setIsIndicatorActive(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleMouseDown = () => {
    handleRowDragStart(row);
  };

  return (
    <div 
      className={`rowDragger ${isIndicatorActive ? "rowDragger--indicator" : "" }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {/* <hr/> */}
    </div>
  );
};

const mapStateToProps = ({
  ui: {
    excel: {
      cursorType,
      isSelectionMode
    }
  }
}) => ({
  cursorType,
  isSelectionMode
});

let RowHeaderCell = ({ 
  style, 
  row, 
  cursorType,
  isSelectionMode,
  handleRowDragStart,
  handleClickRowHeader 
}) => {
  const handleClick = ({ ctrlKey }) => handleClickRowHeader(row, ctrlKey);

  const value = row;

  return (
    <div className="cell cell--positionIndicator cell--header" style={style} onClick={handleClick}>
      <div>{value}</div>
      {!isSelectionMode && cursorType === "default" && <RowDragger row={row} handleRowDragStart={handleRowDragStart}/>}
    </div>
  );
};

RowHeaderCell = connect(mapStateToProps)(RowHeaderCell);

export default RowHeaderCell;