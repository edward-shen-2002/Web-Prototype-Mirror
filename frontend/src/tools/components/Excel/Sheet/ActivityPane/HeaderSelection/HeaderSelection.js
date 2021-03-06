import React, { Fragment, useMemo } from "react";

import { connect } from "react-redux";

import { 
  getTopOffsets, 
  getLeftOffsets,
  getNormalColumnWidth,
  getNormalRowHeight
} from "@tools/excel";

import { 
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER, 
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER
} from "@constants/excel";

import "./HeaderSelection.scss";

const mapHeaderStateToProps = ({
  ui: {
    excel: {
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetColumnWidths,
      sheetRowHeights,
      sheetRowCount,
      sheetColumnCount,
      sheetFreezeColumnCount,
      sheetFreezeRowCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetColumnWidths,
  sheetRowHeights,
  sheetRowCount,
  sheetColumnCount,
  sheetFreezeColumnCount,
  sheetFreezeRowCount
});

const mergeSegments = (segments) => {
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

const HeaderSelectionComponents = ({ headerStyles }) => headerStyles.map((headerStyle, index) => (
  <div key={`header-selection-${index}`} className="headerStyles" style={headerStyle}/>
)); 

export let HeaderSelection = ({ 
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas,
  sheetColumnWidths,
  sheetRowHeights,
  sheetRowCount,
  sheetColumnCount,
  sheetFreezeColumnCount,
  sheetFreezeRowCount
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  const { x, y } = activeCellPosition;
  // Combine/merge x and y segments
  // Format active cell position
  const activeCellPositionArea = { x1: x, y1: y, x2: x, y2: y };

  let combinedAreas = [ activeCellPositionArea, ...stagnantSelectionAreas ];

  if(activeSelectionArea) combinedAreas.push(activeSelectionArea);

  let xSegments = [];
  let ySegments = [];

  // Sort points in each segment
  combinedAreas.forEach(({ x1, y1, x2, y2 }) => {
    let ySegment = [ Math.min(y1, y2), Math.max(y1, y2) ];
    let xSegment = [ Math.min(x1, x2), Math.max(x1, x2) ];

    if(ySegment[0] <= sheetFreezeRowCount) {
      if(ySegment[1] > sheetFreezeRowCount) ySegment[1] = sheetFreezeRowCount;
      ySegments.push(ySegment);
    }

    if(xSegment[0] <= sheetFreezeColumnCount) {
      if(xSegment[1] > sheetFreezeColumnCount) xSegment[1] = sheetFreezeColumnCount;
      xSegments.push(xSegment);
    }
  });

  const yElementarySegments = mergeSegments(ySegments);
  const xElementarySegments = mergeSegments(xSegments);

  if(!yElementarySegments.length && !xElementarySegments.length) return null;

  const rowHeaderStyles = yElementarySegments.map(([ start, end ]) => {
    const topStart = topOffsets[start];
    const width = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;

    const topEnd = topOffsets[end];

    const heightEnd = getNormalRowHeight(sheetRowHeights[end]);

    return ({
      top: topStart,
      left: 0,
      height: topEnd + heightEnd - topStart,
      width
    });
  });

  const columnHeaderStyles = xElementarySegments.map(([ start, end ]) => {
    const leftStart = leftOffsets[start];
    const height = DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER;

    const leftEnd = leftOffsets[end];
    
    const widthEnd = getNormalColumnWidth(sheetColumnWidths[end]);

    return ({
      top: 0,
      left: leftStart,
      height,
      width: leftEnd + widthEnd - leftStart
    });
  });

  return (
    <Fragment>
      <HeaderSelectionComponents headerStyles={rowHeaderStyles}/>
      <HeaderSelectionComponents headerStyles={columnHeaderStyles}/>
    </Fragment>
  );
};

HeaderSelection = connect(mapHeaderStateToProps)(HeaderSelection);

const mapColumnHeaderStateToProps = ({
  ui: {
    excel: {
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetColumnWidths,
      sheetColumnCount,
      sheetFreezeColumnCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetColumnWidths,
  sheetColumnCount,
  sheetFreezeColumnCount
});

export let ColumnHeaderSelection = ({
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas,
  sheetColumnWidths,
  sheetColumnCount,
  sheetFreezeColumnCount
}) => {
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  const { x } = activeCellPosition;
  // Combine/merge x and y segments
  // Format active cell position
  const activeCellPositionArea = { x1: x, x2: x };

  let combinedAreas = [ activeCellPositionArea, ...stagnantSelectionAreas ];

  if(activeSelectionArea) combinedAreas.push(activeSelectionArea);

  let xSegments = [];

  // Sort points in each segment
  combinedAreas.forEach(({ x1, x2 }) => {
    let xSegment = [ Math.min(x1, x2), Math.max(x1, x2) ];

    if(xSegment[1] > sheetFreezeColumnCount) {
      if(xSegment[0] <= sheetFreezeColumnCount) xSegment[0] = sheetFreezeColumnCount + 1;
      xSegments.push(xSegment);
    }
  });

  const xElementarySegments = mergeSegments(xSegments);

  if(!xElementarySegments.length) return null;

  const columnHeaderStyles = xElementarySegments.map(([ start, end ]) => {
    const leftStart = leftOffsets[start];
    const height = DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER;
    
    const leftEnd = leftOffsets[end];
    const widthEnd = getNormalColumnWidth(sheetColumnWidths[end]);

    return ({
      top: 0,
      left: leftStart,
      height,
      width: leftEnd + widthEnd - leftStart
    });
  });

  return (
    <HeaderSelectionComponents headerStyles={columnHeaderStyles}/>
  );
};

ColumnHeaderSelection = connect(mapColumnHeaderStateToProps)(ColumnHeaderSelection);

const mapRowHeaderStateToProps = ({
  ui: {
    excel: {
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,

      sheetRowHeights,
      sheetRowCount,
      sheetFreezeRowCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetRowHeights,
  sheetRowCount,
  sheetFreezeRowCount
});

export let RowHeaderSelection = ({ 
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas,
  sheetRowHeights,
  sheetRowCount,
  sheetFreezeRowCount
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);

  const { y } = activeCellPosition;
  // Combine/merge x and y segments
  // Format active cell position
  const activeCellPositionArea = { y1: y, y2: y };

  let combinedAreas = [ activeCellPositionArea, ...stagnantSelectionAreas ];

  if(activeSelectionArea) combinedAreas.push(activeSelectionArea);

  let ySegments = [];

  // Sort points in each segment
  combinedAreas.forEach(({ y1, y2 }) => {
    let ySegment = [ Math.min(y1, y2), Math.max(y1, y2) ];

    if(ySegment[1] > sheetFreezeRowCount) {
      if(ySegment[0] <= sheetFreezeRowCount) ySegment[0] = sheetFreezeRowCount + 1;
      ySegments.push(ySegment);
    }
  });

  const yElementarySegments = mergeSegments(ySegments);

  if(!yElementarySegments.length) return null;

  const rowHeaderStyles = yElementarySegments.map(([ start, end ]) => {
    const topStart = topOffsets[start];
    const width = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;

    const topEnd = topOffsets[end];
    const heightEnd = getNormalRowHeight(sheetRowHeights[end]);

    const topFreeze = topOffsets[sheetFreezeRowCount];
    const heightFreeze = getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]);

    return ({
      top: topStart - topFreeze - heightFreeze,
      left: 0,
      height: topEnd + heightEnd - topStart,
      width
    });
  });


  return (
    <HeaderSelectionComponents headerStyles={rowHeaderStyles}/>
  );
};

RowHeaderSelection = connect(mapRowHeaderStateToProps)(RowHeaderSelection);