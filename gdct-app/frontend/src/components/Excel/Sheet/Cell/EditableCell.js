import React, { useMemo, useCallback } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import uniqid from 'uniqid';

import { getCellInlineStyle, getBlockStyle, getAreaDimensions } from '../../../../tools/excel';

import {
  mouseDown,
  doubleClickEditableCell,
  selectOver,
  rightClickCell,
} from '../../../../store/actions/ui/excel/mouse';

import topOffsetsSelector from '../../../../store/selectors/ui/excel/topOffsets';
import leftOffsetsSelector from '../../../../store/selectors/ui/excel/leftOffsets';

const RichTextCellContent = richText =>
  richText.map(({ styles, text }) => (
    <span key={uniqid()} style={styles}>
      {text}
    </span>
  ));

const CellContent = ({ value, hyperlink, handleClickContent }) => <div>{value}</div>;

const CellContents = ({
  style,
  value,
  comments,
  hyperlink,
  handleMouseDown,
  handleMouseEnter,
  handleDoubleClick,
  handleRightClick,
  handleClickContent,
}) => (
  <div
    className="cell cell__data"
    style={style}
    onMouseDown={handleMouseDown}
    onMouseEnter={handleMouseEnter}
    onDoubleClick={handleDoubleClick}
    onContextMenu={handleRightClick}
  >
    {value && (
      <CellContent value={value} hyperlink={hyperlink} handleClickContent={handleClickContent} />
    )}
    {comments && comments.length && <div className="cell__comment" />}
  </div>
);

const MergedCell = ({
  style,
  value,
  merged,
  comments,
  hyperlink,
  handleMouseDown,
  handleMouseEnter,
  handleDoubleClick,
  handleRightClick,
}) => {
  const { topOffsets, leftOffsets, sheetRowHeights, sheetColumnWidths } = useSelector(
    ({
      ui: {
        excel: {
          present: { sheetRowCount, sheetColumnCount, sheetRowHeights, sheetColumnWidths },
        },
      },
    }) => ({
      topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
      leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
      sheetRowHeights,
      sheetColumnWidths,
    }),
    shallowEqual,
  );

  // Compute merged height and width
  const dimensions = useMemo(
    () =>
      getAreaDimensions({
        ...merged,
        topOffsets,
        leftOffsets,
        sheetRowHeights,
        sheetColumnWidths,
      }),
    [merged, topOffsets, leftOffsets, sheetRowHeights, sheetColumnWidths],
  );

  style = { ...style, ...dimensions };

  return (
    <CellContents
      style={style}
      value={value}
      hyperlink={hyperlink}
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
}) => {
  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    ({ buttons, ctrlKey, shiftKey }) => {
      if (buttons === 1)
        dispatch(
          mouseDown({
            x1: columnIndex,
            y1: rowIndex,
            ctrlKey,
            shiftKey,
          }),
        );
    },
    [dispatch],
  );

  const handleMouseEnter = useCallback(
    ({ buttons, ctrlKey }) => {
      if (buttons === 1)
        dispatch(
          selectOver({
            newX2: columnIndex,
            newY2: rowIndex,
            ctrlKey,
          }),
        );
    },
    [dispatch],
  );

  const handleDoubleClick = useCallback(() => dispatch(doubleClickEditableCell()), [dispatch]);

  const handleRightClick = useCallback(
    () => dispatch(rightClickCell({ row: rowIndex, column: columnIndex })),
    [dispatch],
  );

  let merged;
  let value;
  let type;
  let comments;
  let hyperlink;

  if (cellData) {
    value = cellData.value;
    type = cellData.type;
    comments = cellData.comments;
    merged = cellData.merged;
    hyperlink = cellData.hyperlink;

    if (type === 'rich-text') {
      const containerStyle = cellData.styles;
      value = RichTextCellContent(value);

      style = { ...style, ...containerStyle };
    } else {
      style = { ...style, ...cellData.styles };
    }
  }

  return merged ? (
    <MergedCell
      style={style}
      value={value}
      merged={merged}
      comments={comments}
      hyperlink={hyperlink}
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleDoubleClick={handleDoubleClick}
      handleRightClick={handleRightClick}
    />
  ) : (
    <CellContents
      style={style}
      value={value}
      comments={comments}
      hyperlink={hyperlink}
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleDoubleClick={handleDoubleClick}
      handleRightClick={handleRightClick}
    />
  );
};

// Do not display or have any event handlers for merged children
const EditableCellContainer = props =>
  props.cellData &&
  props.cellData.merged &&
  (props.cellData.merged.y1 !== props.rowIndex ||
    props.cellData.merged.x1 !== props.columnIndex) ? null : (
    <EditableCell {...props} />
  );

export default EditableCellContainer;
