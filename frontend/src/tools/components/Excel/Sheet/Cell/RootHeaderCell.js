import React from "react";

// Contains draggable borders for freeze row/columns
const RootHeaderCell = ({ style, handleClickRootHeader }) => {
  const handleClick = () => handleClickRootHeader();

  const className = "cell cell--positionIndicator";

  return (
    <div className={className} style={style} onClick={handleClick}></div>
  );
};

export default RootHeaderCell;