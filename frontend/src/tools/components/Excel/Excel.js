import React, { useState, useRef } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";
import EventListener from "./EventListener";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ 
  name, 
  workbook, 
  returnLink, 

  handleSubmitName 
}) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));

  const sheetRef = useRef(null);

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
        sheetRef={sheetRef}
      />
      <Divider/>
      <SheetNavigator workbook={workbook}/>
      <EventListener/>
    </div>
  );
};

export default Excel;