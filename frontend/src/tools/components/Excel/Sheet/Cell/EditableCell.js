import React from "react";

import uniqid from "uniqid";

import { getCellInlineStyle, getBlockStyle } from "@tools/excel";

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

  eventListenerRef
}) => {
  const handleMouseDown = ({ buttons, ctrlKey, shiftKey }) => {
    if(buttons === 1) eventListenerRef.current.startSelection(columnIndex, rowIndex, ctrlKey, shiftKey);
  };

  const handleMouseEnter = ({ buttons, ctrlKey }) => {
    if(buttons === 1) eventListenerRef.current.selectOver(columnIndex, rowIndex, ctrlKey);
  };

  const handleDoubleClick = () => eventListenerRef.current.doubleClickEditableCell();
  const handleRightClick = (event) => eventListenerRef.current.rightClickCell(event, rowIndex, columnIndex);

  let value;
  let type;
  let comments;

  if(cellData) {
    value = cellData.value;
    type = cellData.type;
    comments = cellData.comments

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
      className="cell cell__data" 
      style={style} 
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      {value}
      {comments && comments.length && <div className="cell__comment"></div>}
    </div>
  );
};

export default EditableCell;