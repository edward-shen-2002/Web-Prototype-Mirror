import React, { useState } from "react";

import { connect } from "react-redux";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

const ColumnDragger = ({
  column,
  eventListenerRef
}) => {
  const [ isIndicatorActive, setIsIndicatorActive ] = useState(false);

  const handleMouseEnter = () => setIsIndicatorActive(true);

  const handleMouseLeave = () => setIsIndicatorActive(false);

  const handleClick = (event) => event.stopPropagation();

  const handleMouseDown = () => eventListenerRef.current.startColumnDrag(column);

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
  eventListenerRef
}) => {
  const handleClick = ({ ctrlKey }) => eventListenerRef.current.clickColumnHeader(column, ctrlKey);

  const value = columnNumberToName(column);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      <div>{value}</div>
      {!isSelectionMode && cursorType === "default" && <ColumnDragger column={column} eventListenerRef={eventListenerRef}/>}
    </div>
  );
};

ColumnHeaderCell =  connect(mapStateToProps)(ColumnHeaderCell);

export default ColumnHeaderCell;