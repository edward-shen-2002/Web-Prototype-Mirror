import React, { useState } from "react";

const RowDragger = () => {

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
      className={`rowDragger ${isIndicatorActive ? "rowDragger--indicator" : "" }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <hr/> */}
    </div>
  );
};

const RowHeaderCell = ({ style, row, handleClickRowHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickRowHeader(row, ctrlKey);

  const value = row;

  return (
    <div className="cell cell--positionIndicator cell--rowHeader" style={style} onClick={handleClick}>
      <div>{value}</div>
      <RowDragger/>
    </div>
  );
};

export default RowHeaderCell;