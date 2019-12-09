import React from "react";

const RowHeaderCell = ({ style, row, handleClickRowHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickRowHeader(row, ctrlKey);

  const value = row;

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

export default RowHeaderCell;