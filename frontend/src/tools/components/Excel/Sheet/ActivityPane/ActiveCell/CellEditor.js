import React, { useState, useEffect, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { Editable, Slate, ReactEditor } from "slate-react";
import { Transforms, Editor } from "slate";

import {
  setActiveCellInputValue
} from "@actions/ui/excel/commands";

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

const CellEditor = ({ blockStyle }) => {
  const dispatch = useDispatch();

  const [ isMounted, setIsMounted ] = useState(false);

  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const {
    isSheetFocused,
    activeCellInputData: {
      cellValue,
      cellEditor
    }
   } = useSelector(
    ({ 
      ui: { 
        excel: { 
          present: {
            isSheetFocused,
            activeCellInputData
          }
        } 
      } 
    }) => ({
      isSheetFocused,
      activeCellInputData
    }),
    shallowEqual
  );

  useEffect(() => {
    // if(!isMounted) {
    //   if(isSheetFocused) {
    //     ReactEditor.focus(cellEditor);
    //     Transforms.select(cellEditor, Editor.end(cellEditor, []));
    //   }
  
    //   setIsMounted(true);
    // }
  }, []);

  const handleInputChange = useCallback(
    (value) => dispatch(setActiveCellInputValue({ value, input: "cell" })),
    [ dispatch ]
  );

  return (
    <Slate
      editor={cellEditor}
      value={cellValue}
      onChange={handleInputChange}
    >
      <Editable
        style={{ 
          padding: 2, 
          minHeight: "fit-content",
          height: "100%",
          ...blockStyle 
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  )
};

export default CellEditor;
