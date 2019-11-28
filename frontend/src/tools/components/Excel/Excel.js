import React, { useRef } from "react";

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
  returnLink, 
  handleSubmitName,
  handleSaveWorkbook
}) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);

  return (
    <div className="excel">
      <AppBar 
        name={name} 
        returnLink={returnLink} 
        handleSubmitName={handleSubmitName}
        handleSaveWorkbook={handleSaveWorkbook}
      />
      <Divider/>
      <ToolBar/>
      <Divider/>
      <FormulaBar
        eventListenerRef={eventListenerRef}
        sheetContainerRef={sheetContainerRef}
      />
      <Divider/>
      <Sheet
        sheetContainerRef={sheetContainerRef}
        eventListenerRef={eventListenerRef}
        sheetGridRef={sheetGridRef}
      />
      <Divider/>
      <SheetNavigator/>

      <EventListener 
        eventListenerRef={eventListenerRef}
      />
    </div>
  );
};

export default Excel;