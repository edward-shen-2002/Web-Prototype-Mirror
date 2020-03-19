import React, { useRef } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ type, returnLink }) => {
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);

  return (
    <div className="excel">
      <AppBar type={type} returnLink={returnLink} />
      <Divider/>
      <ToolBar type={type}/>
      <Divider/>
      <FormulaBar sheetContainerRef={sheetContainerRef}/>
      <Divider/>
      <Sheet sheetContainerRef={sheetContainerRef} sheetGridRef={sheetGridRef}/>
      <Divider/>
      <SheetNavigator sheetGridRef={sheetGridRef}/>
    </div>
  );
};

export default Excel;