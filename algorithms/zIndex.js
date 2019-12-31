export const getRowsZIndex = (rows, rowCount, columnCount) => {
  let rowsZIndexList = [];

  for(let row = 0; row < rowCount; row++) {
    let rowZIndex = 2;
    let rowZIndexList = [];
    for(let column = 0; column < columnCount; column++) {
      if(rows[row] !== undefined && rows[row][column] !== undefined) {
        rowZIndexList.push(++rowZIndex);
      } else {
        rowZIndexList.push(rowZIndex - 1);
      }
    }

    rowsZIndexList.push(rowZIndexList);
  }

  return rowsZIndexList;
};

export const mergeSegments = (segments) => {
  if(!segments.length) return [];

  segments.sort((segment1, segment2) => segment1[0] - segment2[0]);

  let merged = [ segments[0] ];
  let lastIndex = 0;

  const segmentsCount = segments.length;

  for(let segmentIndex = 1; segmentIndex < segmentsCount; segmentIndex++) {
    let segment = segments[segmentIndex];
    let currentSegmentStart = segment[0];
    let previousSegmentEnd =  merged[lastIndex][1];

    // Possible overlap case
    if(currentSegmentStart <= previousSegmentEnd) {
      let currentSegmentEnd = segment[1];

      // Extend previous segment
      if(currentSegmentEnd > previousSegmentEnd) merged[lastIndex][1] = currentSegmentEnd;
    } else {
      merged.push(segment);
      lastIndex++;
    }
  }

  return merged;
};