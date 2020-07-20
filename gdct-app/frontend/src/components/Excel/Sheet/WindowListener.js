import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  selectEnd,
  resizeRow,
  resizeColumn,
  resizeRowEnd,
  resizeColumnEnd,
} from '../../../store/actions/ui/excel/mouse';

import topOffsetsSelector from '../../../store/selectors/ui/excel/topOffsets';
import leftOffsetsSelector from '../../../store/selectors/ui/excel/leftOffsets';

const WindowListener = () => {
  const {
    isColumnResizeMode,
    isRowResizeMode,
    topOffsets,
    leftOffsets,
    isSelectionMode,
  } = useSelector(
    ({
      ui: {
        excel: {
          present: {
            sheetRowHeights,
            sheetColumnWidths,
            sheetRowCount,
            sheetColumnCount,
            isRowResizeMode,
            isColumnResizeMode,
            isSelectionMode,
          },
        },
      },
    }) => ({
      topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
      leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
      isRowResizeMode,
      isColumnResizeMode,
      isSelectionMode,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  window.onmouseup = useCallback(
    ({ ctrlKey }) => {
      if (isSelectionMode) {
        dispatch(selectEnd({ ctrlKey }));
      } else if (isColumnResizeMode) {
        dispatch(resizeColumnEnd({ leftOffsets }));
      } else if (isRowResizeMode) {
        dispatch(resizeRowEnd({ topOffsets }));
      }

      // dispatch(mouseUp({ ctrlKey, leftOffsets, topOffsets }));
    },
    [dispatch, leftOffsets, topOffsets, isSelectionMode, isColumnResizeMode, isRowResizeMode],
  );

  // ! Handle scroll when outside sheet grid
  window.onmousemove = useCallback(
    ({ clientX: xOffset, clientY: yOffset }) => {
      if (isColumnResizeMode) {
        dispatch(resizeColumn({ xOffset, leftOffsets }));
      } else if (isRowResizeMode) {
        dispatch(resizeRow({ yOffset, topOffsets }));
      }
    },
    [dispatch, isColumnResizeMode, isRowResizeMode, topOffsets, leftOffsets],
  );

  return null;
};

export default WindowListener;
