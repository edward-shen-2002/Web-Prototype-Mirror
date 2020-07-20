import React from 'react';

import { connect } from 'react-redux';

import topOffsetsSelector from '../../../../../store/selectors/ui/excel/topOffsets';
import leftOffsetsSelector from '../../../../../store/selectors/ui/excel/leftOffsets';

import './ActiveSelectionArea.scss';

const mapStateToProps = ({
  ui: {
    excel: {
      present: {
        isSelectionMode,
        activeSelectionArea,

        sheetFreezeColumnCount,
        sheetFreezeRowCount,
        sheetColumnWidths,
        sheetRowHeights,
        sheetColumnCount,
        sheetRowCount,
      },
    },
  },
}) => ({
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetColumnCount,
  sheetRowCount,
  topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
  leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
});

let ActiveSelectionArea = ({
  computeSelectionAreaStyle,
  isRelevantArea,

  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  topOffsets,
  leftOffsets,
}) => {
  if (!isSelectionMode || !activeSelectionArea) return null;

  const { x1, y1, x2, y2 } = activeSelectionArea;

  if (!isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  const activeSelectionAreaStyle = computeSelectionAreaStyle(
    sheetColumnWidths,
    leftOffsets,
    sheetRowHeights,
    topOffsets,
    activeSelectionArea,
    sheetFreezeColumnCount,
    sheetFreezeRowCount,
    true,
  );

  return <div className="activeSelectionArea" style={activeSelectionAreaStyle} />;
};

ActiveSelectionArea = connect(mapStateToProps)(ActiveSelectionArea);

export default ActiveSelectionArea;
