import React, { useState, useEffect, useRef } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";
import EventListener from "./EventListener";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS
} from "constants/excel";


import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const iniitalizeFreezePaneCounts = (sheet) => {
  const panes = sheet.panes();

  let freezeRowCount;
  let freezeColumnCount; 

  if(panes && panes.state === "frozen") {
    freezeRowCount = panes.ySpit;
    freezeColumnCount = panes.xSplit;
  } else {
    freezeRowCount = 0;
    freezeColumnCount = 0;
  }

  return { freezeRowCount, freezeColumnCount };
};

const Excel = ({ 
  name, 
  workbook, 
  returnLink, 

  handleSubmitName 
}) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));
  const [ sheetNames, setSheetNames ] = useState(workbook.sheets().map((sheet) => sheet.name()));
  const [ activeSheetIndex, setActiveSheetIndex ] = useState(0);
  const [ sheetValues, setSheetValues ] = useState(workbook.sheet(0).usedRange().value());

  const [ frozenPane, setFrozenPane ] = useState(iniitalizeFreezePaneCounts(workbook.sheet(0)));

  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);
  
  const [ isMounted, setIsMounted ] = useState(false);

  const sheetRef = useRef(null);

  const handleChangeCellValue = (row, column, value) => {
    sheet.row(row).cell(column).setValue(value);

    const rowValues = sheetValues[row];

    const newRow = [ ...rowValues.slice(0, column), value, ...rowValues.slice(column + 1) ];

    setSheetValues([ ...sheetValues.slice(0, row), newRow, sheetValues, ...sheetValues.slice(row + 1) ]);
  };

  const handleChangeSheet = (index) => {
    const newSheet = workbook.sheet(index);

    setSheet(newSheet);
    setActiveSheetIndex(index);
    setSheetValues(newSheet.usedRange().value());
    setFrozenPane(iniitalizeFreezePaneCounts(newSheet))
  };

  const handleUpdateSheetNames = (sheetNames) => {
    setSheetNames(sheetNames);
  };

  useEffect(() => {
    if(!isMounted) {
      const { _maxColumnNumber, _maxRowNumber } = sheet.usedRange();
      setColumnCount(_maxColumnNumber + 1);
      setRowCount(_maxRowNumber + 1);
      setIsMounted(true);
    }
  });

  const { freezeRowCount, freezeColumnCount } = frozenPane;

  return (
    <div className="excel">
      <AppBar 
        name={name} 
        returnLink={returnLink} 
        handleSubmitName={handleSubmitName}
      />
      <Divider/>
      <ToolBar/>
      <Divider/>
      <FormulaBar/>
      <Divider/>
      <Sheet 
        sheet={sheet} 
        values={sheetValues} 
        handleChangeCellValue={handleChangeCellValue}
        rowCount={rowCount}
        columnCount={columnCount}

        freezeRowCount={freezeRowCount}
        freezeColumnCount={freezeColumnCount}

        sheetRef={sheetRef}
      />
      <Divider/>
      <SheetNavigator 
        activeSheetIndex={activeSheetIndex} 
        sheetNames={sheetNames}
        workbook={workbook}
        handleChangeSheet={handleChangeSheet}
        handleUpdateSheetNames={handleUpdateSheetNames}
      />
      <EventListener/>
    </div>
  );
};

export default Excel;