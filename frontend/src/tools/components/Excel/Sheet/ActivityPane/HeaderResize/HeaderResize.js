// import React, { Fragment, useMemo } from "react";

// import { connect } from "react-redux";

// import { DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER, DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER } from "constants/excel";

// import "./HeaderResize.scss";

// const mapColumnStateToProps = ({
//   ui: {
//     excel: {
//       isColumnResizeMode,
//       columnResizeData
//     }
//   }
// }) => ({
//   isColumnResizeMode,
//   columnResizeData
// });

// export let ColumnResize = ({
//   isColumnResizeMode,
//   columnResizeData
// }) => {

//   if(!isColumnResizeMode) return null;
  
//   const { offset } = columnResizeData;

//   return (
//     <Fragment>

//     </Fragment>
//   );
// };

// ColumnResize = connect(mapColumnStateToProps)(ColumnResize);

// const mapRowStateToProps = ({
//   ui: {
//     excel: {
//       isRowResizeMode,
//       rowResizeData,
//       sheetColumnWidths, 
//       sheetColumnCount
//     }
//   }
// }) => ({
//   isRowResizeMode,
//   rowResizeData,
//   sheetColumnWidths, 
//   sheetColumnCount
// });

// export let RowResize = ({
//   isRowResizeMode,
//   rowResizeData,
//   sheetColumnWidths, 
//   sheetColumnCount
// }) => {

//   // const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

//   if(!isRowResizeMode) return null;

//   const { offset } = rowResizeData;

//   const headerIndicatorStyle = {
//     left: 0,
//     width: DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,
//     top: offset,
//     height: 2
//   };

//   const contentIndicatorStyle = {
//     left: DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,
//     width: "100%", 
//     top: offset,
//     height: 2
//   };

//   return (
//     <Fragment>
//       <div
//         className="rowResize__headerIndicator"
//         style={headerIndicatorStyle}
//       />
//       <div
//         className="rowResize__contentIndicator"
//         style={contentIndicatorStyle}
//       />
//     </Fragment>
//   );
// };

// RowResize = connect(mapRowStateToProps)(RowResize);



// // const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
// // const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);