import React, { useState } from "react";

import { connect } from "react-redux";

const RowDragger = ({
  row,
  eventListenerRef
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

  const handleMouseDown = () => eventListenerRef.current.startRowDrag(row);

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
      present: {
        cursorType,
        isSelectionMode
      }
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
  eventListenerRef
}) => {
  const handleClick = ({ ctrlKey }) => eventListenerRef.current.clickRowHeader(row, ctrlKey);

  return (
    <div className="cell cell--positionIndicator cell--header" style={style} onClick={handleClick}>
      <div>{row}</div>
      {!isSelectionMode && cursorType === "default" && <RowDragger row={row} eventListenerRef={eventListenerRef}/>}
    </div>
  );
};

RowHeaderCell = connect(mapStateToProps)(RowHeaderCell);

export default RowHeaderCell;