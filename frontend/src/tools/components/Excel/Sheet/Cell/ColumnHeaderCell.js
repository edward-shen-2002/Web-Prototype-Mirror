import React, { useState } from "react";

import { connect } from "react-redux";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

const ColumnDragger = ({
  column,
  handleColumnDragStart
}) => {
  const [ isIndicatorActive, setIsIndicatorActive ] = useState(false);

  const handleMouseEnter = () => setIsIndicatorActive(true);

  const handleMouseLeave = () => setIsIndicatorActive(false);

  const handleClick = (event) => event.stopPropagation();

  const handleMouseDown = () => handleColumnDragStart(column);

  return (
    <div 
      className={`columnDragger ${isIndicatorActive ? "columnDragger--indicator" : "" }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
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

let ColumnHeaderCell = ({ 
  style, 
  column, 
  cursorType,
  isSelectionMode,
  handleColumnDragStart,
  handleClickColumnHeader 
}) => {
  const handleClick = ({ ctrlKey }) => handleClickColumnHeader(column, ctrlKey);

  const value = columnNumberToName(column);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      <div>{value}</div>
      {!isSelectionMode && cursorType === "default" && <ColumnDragger column={column} handleColumnDragStart={handleColumnDragStart}/>}
    </div>
  );
};

ColumnHeaderCell =  connect(mapStateToProps)(ColumnHeaderCell);

export default ColumnHeaderCell;