import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";
import { setIsSelectionModeOn, setIsSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS
} from "constants/excel";


import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const initializeActiveCell = (sheet) => {
  const activeCell = { row: 1, column: 1 };

  const { row, column } = activeCell;
  sheet.activeCell(row, column);

  return activeCell;
};

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

const mapStateToProps = ({ ui: { excel: { isSelectionMode } } }) => ({ isSelectionMode });

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea)),
  handleSetSelectionModeOn: () => dispatch(setIsSelectionModeOn()),
  handleSetSelectionModeOff: () => dispatch(setIsSelectionModeOff())
});

let Excel = ({ 
  name, 
  workbook, 
  returnLink, 
  isSelectionMode,

  handleUpdateSelectionArea,
  handleSetSelectionModeOn,
  handleSetSelectionModeOff,

  handleSubmitName 
}) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));
  const [ sheetIndex, setSheetIndex ] = useState(0);
  const [ sheetValues, setSheetValues ] = useState(sheet.usedRange().value());

  const [ frozenPane, setFrozenPane ] = useState(iniitalizeFreezePaneCounts(sheet));

  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);

  const [ isActiveCellEditMode, setIsActiveCellEditMode ] = useState(false);
  const [ activeCell, setActiveCell ] = useState(initializeActiveCell(sheet));
  
  const [ isMounted, setIsMounted ] = useState(false);

  const sheetRef = useRef(null);

  const handleChangeCellValue = (row, column, value) => {
    sheet.row(row).cell(column).setValue(value);

    const rowValues = sheetValues[row];

    const newRow = [ ...rowValues.slice(0, column), value, ...rowValues.slice(column + 1) ];

    setSheetValues([ ...sheetValues.slice(0, row), newRow, sheetValues, ...sheetValues.slice(row + 1) ]);
  };

  const handleChangeSheet = (index) => {
    setSheet(workbook.sheet(index));
    setSheetIndex(index);
    setSheetValues(sheet.usedRange().value());
  };

  const handleSetActiveCellEdit = () => setIsActiveCellEditMode(true);
  const handleSetActiveCellNormal = () => setIsActiveCellEditMode(false);

  useEffect(() => {
    if(!isMounted) {
      const { _maxColumnNumber, _maxRowNumber } = sheet.usedRange();
      setColumnCount(_maxColumnNumber + 1);
      setRowCount(_maxRowNumber + 1);
      setIsMounted(true);

    }
    window.onmouseup = () => {
      if(isSelectionMode) handleSetSelectionModeOff();
    };
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

        isSelectionMode={isSelectionMode}

        activeCell={activeCell}
        isActiveCellEditMode={isActiveCellEditMode}
        
        handleUpdateSelectionArea={handleUpdateSelectionArea}
        handleSetSelectionModeOn={handleSetSelectionModeOn}
        handleSetSelectionModeOff={handleSetSelectionModeOff}

        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
      />
      <Divider/>
      <SheetNavigator 
        sheetIndex={sheetIndex} 
        handleChangeSheet={handleChangeSheet}
      />
    </div>
  );
};

Excel = connect(mapStateToProps, mapDispatchToProps)(Excel);

export default Excel;