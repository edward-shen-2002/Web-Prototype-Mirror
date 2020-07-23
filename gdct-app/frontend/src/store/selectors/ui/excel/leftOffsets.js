import { createSelector } from 'reselect';

import { getLeftOffsets } from '../../../../tools/excel';

const getColumnWidths = ({ sheetColumnWidths }) => sheetColumnWidths;
const getColumnCount = ({ sheetColumnCount }) => sheetColumnCount;

const leftOffsetsSelector = createSelector(
  [getColumnWidths, getColumnCount],
  (columnWidths, columnCount) => getLeftOffsets(columnWidths, columnCount),
);

export default leftOffsetsSelector;
