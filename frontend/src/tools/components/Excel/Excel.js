import React, { useState } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ 
  name, 
  workbook, 
  returnLink, 

  handleSubmitName 
}) => {
  const [ sheet, setSheet ] = useState(workbook.sheet(0));

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
      />
      <Divider/>
      <SheetNavigator workbook={workbook}/>
    </div>
  );
};

export default Excel;