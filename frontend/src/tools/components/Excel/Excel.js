import React, { useRef, useCallback, useMemo } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import EventListener from "./EventListener";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ 
  type,
  returnLink
}) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);

  return (
    <div className="excel">
      <AppBar 
        eventListenerRef={eventListenerRef}
        type={type}
        returnLink={returnLink} 
      />
      <Divider/>
      <ToolBar
        type={type}
      />
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
      <SheetNavigator
        sheetGridRef={sheetGridRef}
        eventListenerRef={eventListenerRef}
      />
      <EventListener 
        ref={eventListenerRef}
        sheetGridRef={sheetGridRef}
        sheetContainerRef={sheetContainerRef}
      />
    </div>
  );
};

export default Excel;