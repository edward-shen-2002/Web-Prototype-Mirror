import React, { useRef, useCallback, useMemo } from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import EventListener from "./EventListener";

import { useSelector } from "react-redux";

import { Slate } from "slate-react";

import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ 
  type,
  returnLink
}) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);
  const sheetGridRef = useRef(null);

  const {
    // editor,
    value
  } = useSelector(({
    ui: {
      excel: {
        activeCellInputData
      }
    }
  }) => activeCellInputData);

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const handleInputChange = useCallback((value) => eventListenerRef.current.changeActiveInputData({ value }), [ value ]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={handleInputChange}
    >
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
    </Slate>
  );
};

export default Excel;