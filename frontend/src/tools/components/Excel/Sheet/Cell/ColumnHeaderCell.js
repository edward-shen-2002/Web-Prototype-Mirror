import React, { useState } from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

const ColumnDragger = () => {

  const [ isIndicatorActive, setIsIndicatorActive ] = useState(false);

  const handleMouseEnter = () => {
    setIsIndicatorActive(true);
  };

  const handleMouseLeave = () => {
    setIsIndicatorActive(false);
  };

  const handleMouseClick = () => {
    // Prevent propagation?
  };

  return (
    <div 
      className={`columnDragger ${isIndicatorActive ? "columnDragger--indicator" : "" }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    </div>
  );
};


const ColumnHeaderCell = ({ style, column, handleClickColumnHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickColumnHeader(column, ctrlKey);

  const value = columnNumberToName(column);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      <div>{value}</div>
      <ColumnDragger/>
    </div>
  );
};

export default ColumnHeaderCell;