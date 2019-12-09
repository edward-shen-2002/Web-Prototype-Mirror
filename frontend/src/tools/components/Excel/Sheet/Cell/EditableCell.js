import React from "react";

import uniqid from "uniqid";

const RichTextCellContent = (richText) => richText.map(({ styles, text }) => {
  <span key={uniqid()} style={styles}>
    {text}
  </span>
});

const EditableCell = ({ 
  style, 
  cellData, 

  columnIndex, 
  rowIndex, 

  handleSelectionStart,
  handleSelectionOver,

  handleDoubleClickEditableCell
}) => {
  const handleMouseDown = ({ buttons, ctrlKey, shiftKey }) => {
    if(buttons === 1) handleSelectionStart(columnIndex, rowIndex, ctrlKey, shiftKey);
  };

  const handleMouseEnter = ({ buttons, ctrlKey }) => {
    if(buttons === 1) handleSelectionOver(columnIndex, rowIndex, ctrlKey);
  };

  const handleDoubleClick = () => {
    handleDoubleClickEditableCell();
  };

  let value = cellData ? cellData.value : undefined;
  let type = cellData ? cellData.type : undefined;

  if(type === "rich-text") value = RichTextCellContent(value);

  if(cellData && cellData.styles) style = { ...style, ...cellData.styles };

  return (
    <div 
      className="cell" 
      style={style} 
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
    >
      {value}
    </div>
  );
};

export default EditableCell;