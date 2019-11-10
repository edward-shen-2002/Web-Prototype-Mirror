import React, { useEffect, useState } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ name, values, workbook, returnLink, handleSubmitName }) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));
  const [ sheetIndex, setSheetIndex ] = useState(0);

  return (
    <div className="excel">
      <AppBar name={name} returnLink={returnLink} handleSubmitName={handleSubmitName}/>
      <Divider/>
      <ToolBar/>
      <Divider/>
      <FormulaBar/>
      <Divider/>
      <Sheet values={values} sheet={sheet}/>
      <Divider/>
      <SheetNavigator/>
    </div>
  );
};

export default Excel;