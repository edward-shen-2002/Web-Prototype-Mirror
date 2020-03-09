import React, { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { Editable, Slate, ReactEditor } from "slate-react";

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
  eventListenerRef
}) => {
  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const {
    activeCellInputAutoFocus,
    activeCellInputData: {
      value,
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

  // useEffect(() => {
  //   if(activeCellInputAutoFocus) ReactEditor.focus(cellEditor);
  // }, [  ]);

  // const editorSelection = useRef(cellEditor.selection);
  // useEffect(() => {
  //     if (activeCellInputAutoFocus) {
  //         editorSelection.current = cellEditor.selection;
  //     }
  // }, [activeCellInputAutoFocus]);

  const handleInputChange = useCallback((value) => eventListenerRef.current.changeActiveInputData({ value }), [ value ]);

  return (
    <Slate
      editor={cellEditor}
      value={value}
      onChange={handleInputChange}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        // readOnly={!activeCellInputAutoFocus}
        autoFocus={true}
      />
    </Slate>
  )
};

export default CellEditor;
