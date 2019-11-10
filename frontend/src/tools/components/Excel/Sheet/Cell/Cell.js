import React from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { sheet, values } = data;

  let className = "cell";
  let cellValue;

  if(columnIndex > 0 && rowIndex > 0){
    cellValue = sheet.row(rowIndex).cell(columnIndex).value();
  } else {
    className = `${className} cell--positionIndicator`;

    if(columnIndex > 0 && rowIndex === 0) {
      cellValue = columnNumberToName(columnIndex);
    } else if(columnIndex === 0 && rowIndex > 0) {
      cellValue = rowIndex;
    } else {
      // cellValue = "root";
    }
  }

  return (
    <div className={className} style={style}>
      {cellValue}
    </div>
  );
};

export default Cell;