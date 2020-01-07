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
  templateData,
  handleUpdateTemplate,
  handleToggleTemplatePublish
}) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);
  const excelRef = useRef(null);

  return (
    <div ref={excelRef} className="excel">
      <AppBar 
        eventListenerRef={eventListenerRef}
        name={name} 
        type={type}
        returnLink={returnLink} 
        templateData={templateData}
        handleUpdateTemplate={handleUpdateTemplate}
        handleToggleTemplatePublish={handleToggleTemplatePublish}
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
        sheetContainerRef={sheetContainerRef}
        eventListenerRef={eventListenerRef}
      />

      {/* Dialogues */}
      {type === "template" && <TemplateDialogue excelRef={excelRef}/>}
    </div>
  );
};

export default Excel;