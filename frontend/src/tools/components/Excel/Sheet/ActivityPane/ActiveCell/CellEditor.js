import React, { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { Editable, Slate, ReactEditor } from "slate-react";
import { Transforms, Editor } from "slate";
import { useState } from "react";

const Leaf = ({ attributes, children, leaf }) => {
  if(leaf.bold) children = <strong>{children}</strong>;
  if(leaf.italic) children = <em>{children}</em>;
  if(leaf.underline) children = <u>{children}</u>;

  return <span {...attributes}>{children}</span>;
};

// ! Only one element for now
const Element = ({ attributes, children, element }) => (
  <span {...attributes}>{children}</span>
);

const CellEditor = ({
  eventListenerRef,
  blockStyle
}) => {
  const [ isMounted, setIsMounted ] = useState(false);

  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const {
    activeCellInputAutoFocus,
    activeCellInputData: {
      cellValue,
      cellEditor
    }
   } = useSelector(({ 
    ui: { 
      excel: { 
        activeCellInputAutoFocus,
        activeCellInputData
      } 
    } 
  }) => ({
    activeCellInputAutoFocus,
    activeCellInputData
  }));

  useEffect(() => {
    if(!isMounted) {
      if(activeCellInputAutoFocus) {
        ReactEditor.focus(cellEditor);
        Transforms.select(cellEditor, Editor.end(cellEditor, []));
      }
  
      setIsMounted(true);
    }
  }, []);

  const handleInputChange = useCallback((cellValue) => {
    eventListenerRef.current.changeActiveInputData({ cellValue })
  });

  return (
    <Slate
      editor={cellEditor}
      value={cellValue}
      onChange={handleInputChange}
    >
      <Editable
        style={{ padding: 2, ...blockStyle }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  )
};

export default CellEditor;
