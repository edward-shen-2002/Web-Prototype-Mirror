const getSelectionAreaColumn = ({
  startX,
  endX,

  x1,
  x2,
  y1,
  y2,

  rowData,
}) => {
  for (let column = startX; column <= endX; column++) {
    const cellData = rowData[column];

    if (cellData && cellData.merged) {
      const { x1: mergedX1, x2: mergedX2, y1: mergedY1, y2: mergedY2 } = cellData.merged;

      const minMergedX = Math.min(mergedX1, mergedX2);
      const maxMergedX = Math.max(mergedX1, mergedX2);
      const minMergedY = Math.min(mergedY1, mergedY2);
      const maxMergedY = Math.max(mergedY1, mergedY2);

      if (minMergedX < x1) x1 = minMergedX;
      if (minMergedY < y1) y1 = minMergedY;
      if (maxMergedX > x2) x2 = maxMergedX;
      if (maxMergedY > y2) y2 = maxMergedY;
    }
  }

  return { x1, x2, y1, y2 };
};

const getSelectionAreaRow = ({
  startY,
  endY,

  x1,
  x2,
  y1,
  y2,

  column,

  sheetCellData,
}) => {
  for (let row = startY; row <= endY; row++) {
    const rowData = sheetCellData[row];

    if (rowData && rowData[column] && rowData[column].merged) {
      const { x1: mergedX1, x2: mergedX2, y1: mergedY1, y2: mergedY2 } = rowData[column].merged;

      const minMergedX = Math.min(mergedX1, mergedX2);
      const maxMergedX = Math.max(mergedX1, mergedX2);
      const minMergedY = Math.min(mergedY1, mergedY2);
      const maxMergedY = Math.max(mergedY1, mergedY2);

      if (minMergedX < x1) x1 = minMergedX;
      if (minMergedY < y1) y1 = minMergedY;
      if (maxMergedX > x2) x2 = maxMergedX;
      if (maxMergedY > y2) y2 = maxMergedY;
    }
  }

  return { x1, x2, y1, y2 };
};

const getNewArea = ({ currentArea, sheetCellData }) => {
  const { x1, x2, y1, y2 } = currentArea;

  let newArea = { ...currentArea };

  const top = sheetCellData[y1];
  const bottom = sheetCellData[y2];

  if (top) {
    newArea = getSelectionAreaColumn({
      startX: newArea.x1,
      endX: newArea.x2,
      rowData: top,
      ...newArea,
    });
  }

  // Bottom might be the same as top (1 row)
  if (bottom && y1 !== y2) {
    newArea = getSelectionAreaColumn({
      startX: newArea.x1,
      endX: newArea.x2,
      rowData: bottom,
      ...newArea,
    });
  }

  // Do not need to check edges because top and bottom covers those already
  newArea = getSelectionAreaRow({
    startY: newArea.y1 + 1,
    endY: newArea.y2 - 1,
    sheetCellData,
    column: x1,
    ...newArea,
  });

  // left might be the same as right (1 column)
  if (x1 !== x2) {
    newArea = getSelectionAreaRow({
      startY: newArea.y1 + 1,
      endY: newArea.y2 - 1,
      sheetCellData,
      column: x2,
      ...newArea,
    });
  }

  return newArea;
};

export const getWholeArea = ({ minX, minY, maxX, maxY, sheetCellData }) => {
  let currentArea = {
    y1: minY,
    x1: minX,
    y2: maxY,
    x2: maxX,
  };

  let newArea = getNewArea({ currentArea, sheetCellData });

  while (
    newArea.x1 !== currentArea.x1 ||
    newArea.x2 !== currentArea.x2 ||
    newArea.y1 !== currentArea.y1 ||
    newArea.y2 !== currentArea.y2
  ) {
    currentArea = newArea;
    newArea = getNewArea({ currentArea: newArea, sheetCellData });
  }

  return newArea;
};

export const getMergedData = (sheetCellData, y, x) =>
  sheetCellData[y] && sheetCellData[y][x] ? sheetCellData[y][x].merged : null;

export const getTabFreeSpot = ({ y, startX, endX, rowData }) => {
  let minX = Infinity;
  let minY = Infinity;
  for (let column = startX; column <= endX; column++) {
    const columnData = rowData[column];

    if (columnData && columnData.merged) {
      const { x1: mergedX1, y1: mergedY1, y2: mergedY2 } = columnData.merged;

      // top left of merge is at the same level as y
      if (mergedY1 === y) {
        minX = mergedX1;

        minY = y;
        break;
        // Get free space after merge
      } else if (mergedY2 < minY) {
        if (mergedX1 < minX) minX = mergedX1;

        minY = mergedY2 + 1;
      }
    } else {
      // Found regular cell -- y doesn't change
      if (y < minY || (y === minY && column < minX)) minX = column;

      minY = y;
      break;
    }
  }

  return { minX, minY };
};

export const getShiftTabFreeSpot = ({ y, startX, endX, rowData }) => {
  let maxX = -1;
  let maxY = -1;
  for (let column = endX; column >= startX; column--) {
    const columnData = rowData[column];

    if (columnData && columnData.merged) {
      const { x1: mergedX1, y1: mergedY1 } = columnData.merged;

      if (mergedY1 >= maxY) {
        if (mergedY1 > maxY || (mergedY1 === maxY && mergedX1 > maxX)) maxX = mergedX1;

        maxY = mergedY1;
      }

      if (mergedY1 === y) break;
    } else {
      // Found regular cell -- y doesn't change
      maxX = column;
      maxY = y;
      break;
    }
  }

  return { maxX, maxY };
};

export const getEnterFreeSpot = ({ x, startY, endY, sheetCellData }) => {
  let minX = Infinity;
  let minY = Infinity;

  for (let row = startY; row <= endY; row++) {
    const rowData = sheetCellData[row];

    if (rowData && rowData[x] && rowData[x].merged) {
      const { x1: mergedX1, x2: mergedX2, y1: mergedY1 } = rowData[x].merged;

      if (x === mergedX1) {
        minX = x;
        minY = mergedY1;
        break;
      } else if (mergedX2 < minX) {
        if (mergedY1 < minY) minY = mergedY1;

        minX = mergedX2 + 1;
      }
    } else {
      // Found regular cell -- y doesn't change
      if (x < minX || (x === minX && row < minY)) minY = row;

      minX = x;
      break;
    }
  }

  return { minX, minY };
};

export const getShiftEnterFreeSpot = ({ x, startY, endY, sheetCellData }) => {
  let maxX = -1;
  let maxY = -1;

  for (let row = endY; row >= startY; row--) {
    const rowData = sheetCellData[row];

    if (rowData && rowData[x] && rowData[x].merged) {
      const { x1: mergedX1, y1: mergedY1 } = rowData[x].merged;

      if (mergedX1 >= maxX) {
        if (mergedX1 > maxX || (mergedX1 === maxX && mergedY1 > maxY)) maxY = mergedY1;

        maxX = mergedX1;
      }

      if (mergedX1 === x) break;
    } else {
      // Found regular cell -- y doesn't change
      if (x > maxX || (x === maxX && row > maxY)) maxY = row;

      maxX = x;
      break;
    }
  }

  return { maxY, maxX };
};
