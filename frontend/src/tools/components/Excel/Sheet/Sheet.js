import React from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";

import "./Sheet.scss";

const columnWidths = new Array(26)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25);

const SheetView = ({ height, width, values, xlsxPopulate }) => {
  // const rowHeight = (index) => {

  // };

  // const columnWidth = (index) => {

  // };

  return (
    <VariableSizeGrid
      freezeRowCount={1}
      freezeColumnCount={1}
      columnCount={26}
      columnWidth={(index) => columnWidths[index]}
      height={height}
      // itemData={}
      rowCount={1000}
      rowHeight={(index) => rowHeights[index]}
      width={width}
    >
      {({ columnIndex, rowIndex, style }) => (
        <Cell style={style} columnIndex={columnIndex} rowIndex={rowIndex} values={values}/>
      )}
    </VariableSizeGrid>
  );
};

const Sheet = ({ xlsxPopulate, values }) => {
  return (
    <div className="sheet">
      <AutoSizer>
        {({ height, width }) => (
          <SheetView height={height} width={width} values={values} xlsxPopulate={xlsxPopulate}/>
        )}
      </AutoSizer>
    </div>
  );
};

export default Sheet;