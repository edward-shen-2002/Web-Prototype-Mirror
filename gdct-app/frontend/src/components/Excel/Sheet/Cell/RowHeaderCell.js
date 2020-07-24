import React, { useState, useCallback } from 'react';

import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';

import { resizeRowStart, selectRow } from '../../../../store/actions/ui/excel/mouse';
import topOffsetsSelector from '../../../../store/selectors/ui/excel/topOffsets';

const RowDragger = ({ row }) => {
  const topOffsets = useSelector(
    ({
      ui: {
        excel: {
          present: { sheetRowHeights, sheetRowCount },
        },
      },
    }) => topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
    shallowEqual,
  );

  const dispatch = useDispatch();
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const handleMouseEnter = () => setIsIndicatorActive(true);

  const handleMouseLeave = () => setIsIndicatorActive(false);

  const handleClick = event => event.stopPropagation();

  const handleMouseDown = useCallback(() => dispatch(resizeRowStart({ row, topOffsets })), [
    dispatch,
    topOffsets,
    row,
  ]);

  return (
    <div
      className={`rowDragger ${isIndicatorActive ? 'rowDragger--indicator' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    />
  );
};

const RowHeaderCell = ({ style, row }) => {
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

  const handleClick = useCallback(({ ctrlKey }) => dispatch(selectRow({ row, ctrlKey })), [
    dispatch,
    row,
  ]);

  return (
    <div className="cell cell--positionIndicator cell--header" style={style} onClick={handleClick}>
      <div>{row}</div>
      {!isSelectionMode && cursorType === 'default' && <RowDragger row={row} />}
    </div>
  );
};

export default RowHeaderCell;
