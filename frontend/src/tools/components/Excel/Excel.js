import React, { useState } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ name, workbook, returnLink, handleSubmitName }) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));
  const [ sheetIndex, setSheetIndex ] = useState(0);
  const [ sheetValues, setSheetValues ] = useState(sheet.usedRange().value());

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

  return (
    <div className="excel">
      <AppBar name={name} returnLink={returnLink} handleSubmitName={handleSubmitName}/>
      <Divider/>
      <ToolBar/>
      <Divider/>
      <FormulaBar/>
      <Divider/>
      <Sheet sheet={sheet} values={sheetValues} handleChangeCellValue={handleChangeCellValue}/>
      <Divider/>
      <SheetNavigator sheetIndex={sheetIndex} handleChangeSheet={handleChangeSheet}/>
    </div>
  );
};

export default Excel;