import React, { Fragment } from "react";

import { connect } from "react-redux";

import "./HeaderSelection.scss";

const mapHeaderStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetsCellOffsets,
      sheetsFreezeColumnCount,
      sheetsFreezeRowCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetCellOffset: sheetsCellOffsets[activeSheetName],
  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName]
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
  sheetCellOffset,
  sheetFreezeColumnCount,
  sheetFreezeRowCount
}) => {
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

  const rowHeaderStyles = yElementarySegments.map(([ start, end ]) => {
    const { top: topStart, width } = sheetCellOffset[start][0];
    const { top: topEnd, height: heightEnd } = sheetCellOffset[end][0];

    return ({
      top: topStart,
      left: 0,
      height: topEnd + heightEnd - topStart,
      width
    });
  });

  const columnHeaderStyles = xElementarySegments.map(([ start, end ]) => {
    const { left: leftStart, height } = sheetCellOffset[0][start];
    const { left: leftEnd, width: widthEnd } = sheetCellOffset[0][end];

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
      activeSheetName,
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetsCellOffsets,
      sheetsFreezeColumnCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetCellOffset: sheetsCellOffsets[activeSheetName],
  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName]
});

export let ColumnHeaderSelection = ({
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas,
  sheetCellOffset,
  sheetFreezeColumnCount
}) => {
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

  const columnHeaderStyles = xElementarySegments.map(([ start, end ]) => {
    const { left: leftStart, height } = sheetCellOffset[0][start];
    const { left: leftEnd, width: widthEnd } = sheetCellOffset[0][end];

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
      activeSheetName,
      activeCellPosition,
      activeSelectionArea,
      stagnantSelectionAreas,
      sheetsCellOffsets,
      sheetsFreezeRowCount
    }
  }
}) => ({
  activeCellPosition,
  activeSelectionArea,
  stagnantSelectionAreas,
  sheetCellOffsets: sheetsCellOffsets[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName]
});

export let RowHeaderSelection = ({ 
  activeCellPosition, 
  activeSelectionArea, 
  stagnantSelectionAreas,
  sheetCellOffsets,
  sheetFreezeRowCount
}) => {
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

  const rowHeaderStyles = yElementarySegments.map(([ start, end ]) => {
    let { top: topStart, width } = sheetCellOffsets[start][0];
    const { top: topEnd, height: heightEnd } = sheetCellOffsets[end][0];

    const { top: topFreeze, height: heightFreeze } = sheetCellOffsets[sheetFreezeRowCount][0];

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