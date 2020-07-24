import React, { useState, useCallback, useMemo } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { columnNumberToName } from 'xlsx-populate/lib/addressConverter';

import { resizeColumnStart, selectColumn } from '../../../../store/actions/ui/excel/mouse';

import leftOffsetsSelector from '../../../../store/selectors/ui/excel/leftOffsets';

const ColumnDragger = ({ column }) => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const leftOffsets = useSelector(
    ({
      ui: {
        excel: {
          present: { sheetColumnWidths, sheetColumnCount },
        },
      },
    }) => leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const handleMouseEnter = () => setIsIndicatorActive(true);

  const handleMouseLeave = () => setIsIndicatorActive(false);

  const handleClick = event => event.stopPropagation();

  const handleMouseDown = useCallback(() => dispatch(resizeColumnStart({ leftOffsets, column })), [
    dispatch,
    leftOffsets,
    column,
  ]);

  return (
    <div
      className={`columnDragger ${isIndicatorActive ? 'columnDragger--indicator' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

const ColumnHeaderCell = ({ style, column }) => {
  const dispatch = useDispatch();

  const { cursorType, isSelectionMode } = useSelector(
    ({
      ui: {
        excel: {
          present: { cursorType, isSelectionMode },
        },
      },
    }) => ({
      cursorType,
      isSelectionMode,
    }),
    shallowEqual,
  );

  const handleClick = useCallback(({ ctrlKey }) => dispatch(selectColumn({ column, ctrlKey })), [
    dispatch,
  ]);

  const value = useMemo(() => columnNumberToName(column), [column]);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      <div>{value}</div>
      {!isSelectionMode && cursorType === 'default' && <ColumnDragger column={column} />}
    </div>
  );
};

export default ColumnHeaderCell;
