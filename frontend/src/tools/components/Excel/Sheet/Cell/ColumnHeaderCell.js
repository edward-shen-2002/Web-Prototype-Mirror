import React from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

const ColumnHeaderCell = ({ style, column, handleClickColumnHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickColumnHeader(column, ctrlKey);

  const value = columnNumberToName(column);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

export default ColumnHeaderCell;