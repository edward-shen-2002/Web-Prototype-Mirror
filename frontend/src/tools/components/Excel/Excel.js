import React, { useRef } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";
import TemplateDialogue from "./dialogues/TemplateDialogue";

import EventListener from "./EventListener";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ 
  name, 
  type,
  returnLink, 
  handleUpdateTemplate
}) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);

  return (
    <div className="excel">
      <AppBar 
        name={name} 
        returnLink={returnLink} 
        handleUpdateTemplate={handleUpdateTemplate}
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
      />
      <EventListener 
        sheetGridRef={sheetGridRef}
        eventListenerRef={eventListenerRef}
      />

      {/* Dialogues */}
      {type === "template" && <TemplateDialogue/>}
    </div>
  );
};

export default Excel;