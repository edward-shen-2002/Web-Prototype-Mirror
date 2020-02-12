import React, { useMemo } from "react";

import { useSelector } from "react-redux";

import uniqid from "uniqid";

import { 
  getCellInlineStyle, 
  getBlockStyle, 
  getAreaDimensions
} from "@tools/excel";

import topOffsetsSelector from "@selectors/ui/excel/topOffsets";
import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";

const RichTextCellContent = (richText, firstFragmentStyle) => richText.map(({ styles, text }, index) => (
  <span key={uniqid()} style={index ? styles : firstFragmentStyle}>
    {text}
  </span>
));

const CellContents = ({
  style,
  value,
  comments,
  handleMouseDown,
  handleMouseEnter,
  handleDoubleClick,
  handleRightClick
}) => (
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

const MergedCell = ({
  style,
  value,
  merged,
  comments,
  handleMouseDown,
  handleMouseEnter,
  handleDoubleClick,
  handleRightClick
}) => {
  const {
    topOffsets,
    leftOffsets,
    sheetRowHeights,
    sheetColumnWidths
  } = useSelector(({
    ui: {
      excel: {
        sheetRowCount,
        sheetColumnCount,
        sheetRowHeights,
        sheetColumnWidths
      }
    }
  }) => ({
    topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
    leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
    sheetRowHeights,
    sheetColumnWidths
  }));

  // Compute merged height and width
  const dimensions = useMemo(() => getAreaDimensions({
    ...merged,
    topOffsets,
    leftOffsets,
    sheetRowHeights,
    sheetColumnWidths
  }), [ merged, topOffsets, leftOffsets, sheetRowHeights, sheetColumnWidths ]);

  style = { ...style, ...dimensions };

  return (
    <CellContents
      style={style}
      value={value}
      comments={comments}
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleDoubleClick={handleDoubleClick}
      handleRightClick={handleRightClick}
    />
  );
};

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

  let merged;
  let value;
  let type;
  let comments;

  if(cellData) {
    value = cellData.value;
    type = cellData.type;
    comments = cellData.comments;
    merged = cellData.merged;

    if(type === "rich-text") {
      const firstFragmentStyle = getCellInlineStyle(cellData.styles);
      const containerStyle = getBlockStyle(cellData.styles);
      value = RichTextCellContent(value, firstFragmentStyle);

      style = { ...style, ...containerStyle };
    } else {
      style = { ...style, ...cellData.styles };
    } 
  };

  return (
    merged 
      ? <MergedCell
          style={style}
          value={value}
          merged={merged}
          comments={comments}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleDoubleClick={handleDoubleClick}
          handleRightClick={handleRightClick}
        />
      : <CellContents
          style={style}
          value={value}
          comments={comments}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleDoubleClick={handleDoubleClick}
          handleRightClick={handleRightClick}
        />
  );
};

// Do not display or have any event handlers for merged children
const EditableCellContainer = (props) => (
  props.cellData
  && props.cellData.merged
  && (props.cellData.merged.y1 !== props.rowIndex || props.cellData.merged.x1 !== props.columnIndex)
    ? null
    : <EditableCell {...props}/>
);

export default EditableCellContainer;