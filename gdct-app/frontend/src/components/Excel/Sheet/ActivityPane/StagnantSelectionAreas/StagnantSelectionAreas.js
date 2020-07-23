import React from 'react';

import { connect } from 'react-redux';

import topOffsetsSelector from '../../../../../store/selectors/ui/excel/topOffsets';
import leftOffsetsSelector from '../../../../../store/selectors/ui/excel/leftOffsets';

import './StagnantSelectionAreas.scss';

const StagnantSelectionAreasComponents = ({ relevantStagnantSelectionAreasStyles }) =>
  relevantStagnantSelectionAreasStyles.map((style, index) => (
    <div key={index} className="stagnantSelectionArea" style={style} />
  ));

const mapStateToProps = ({
  ui: {
    excel: {
      present: {
        stagnantSelectionAreas,

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
  stagnantSelectionAreas,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetColumnCount,
  sheetRowCount,

  topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights }),
  leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths }),
});

let StagnantSelectionAreas = ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  topOffsets,
  leftOffsets,

  isRelevantArea,
  computeSelectionAreaStyle,
}) => {
  const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) =>
    isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount),
  );

  const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map(
    stagnantSelectionArea =>
      computeSelectionAreaStyle(
        sheetColumnWidths,
        leftOffsets,
        sheetRowHeights,
        topOffsets,
        stagnantSelectionArea,
        sheetFreezeColumnCount,
        sheetFreezeRowCount,
        false,
      ),
  );

  return (
    <StagnantSelectionAreasComponents
      relevantStagnantSelectionAreasStyles={relevantStagnantSelectionAreasStyles}
    />
  );
};

StagnantSelectionAreas = connect(mapStateToProps)(StagnantSelectionAreas);

export default StagnantSelectionAreas;
