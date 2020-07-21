import { createSelector } from 'reselect';

import { getTopOffsets } from '../../../../tools/excel';

const getRowHeights = ({ sheetRowHeights }) => sheetRowHeights;
const getRowCount = ({ sheetRowCount }) => sheetRowCount;

const topOffsetsSelector = createSelector([getRowHeights, getRowCount], (rowHeights, rowCount) =>
  getTopOffsets(rowHeights, rowCount),
);

export default topOffsetsSelector;
