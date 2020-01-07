import React from "react";

import uniqid from "uniqid";

import { getCellInlineStyle, getBlockStyle } from "tools/excel";

const RichTextCellContent = (richText, firstFragmentStyle) => richText.map(({ styles, text }, index) => (
  <span key={uniqid()} style={index ? styles : firstFragmentStyle}>
    {text}
  </span>
));

const EditableCell = ({ 
  style, 
  cellData, 

  columnIndex, 
  rowIndex, 

  handleSelectionStart,
  handleSelectionOver,
  handleRightClickCell,

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

  const handleRightClick = (event) => handleRightClickCell(event, rowIndex, columnIndex);

  let value;
  let type;

  if(cellData) {
    value = cellData.value;
    type = cellData.type;
    
    if(type === "rich-text") {
      const firstFragmentStyle = getCellInlineStyle(cellData.styles);
      const containerStyle = getBlockStyle(cellData.styles);
      value = RichTextCellContent(value, firstFragmentStyle);

      style = { ...style, ...containerStyle };
    } else {
      style = { ...style, ...cellData.styles };
    }
  }

  return (
    <div 
      className="cell" 
      style={style} 
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      {value}
    </div>
  );
};

export default EditableCell;