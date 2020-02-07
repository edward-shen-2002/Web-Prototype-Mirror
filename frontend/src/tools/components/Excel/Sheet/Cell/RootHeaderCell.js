import React from "react";

// Contains draggable borders for freeze row/columns
const RootHeaderCell = ({ 
  style, 
  eventListenerRef
}) => {
  const handleClick = () => eventListenerRef.current.selectAll();

  const className = "cell cell--positionIndicator";

  return (
    <div className={className} style={style} onClick={handleClick}></div>
  );
};

export default RootHeaderCell;
