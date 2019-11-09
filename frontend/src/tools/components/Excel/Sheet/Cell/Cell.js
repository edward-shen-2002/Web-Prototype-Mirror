import React from "react";

import "./Cell.scss";

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div className="cell" style={style}>
    Item sssssss{rowIndex},{columnIndex}
  </div>
);

export default Cell;