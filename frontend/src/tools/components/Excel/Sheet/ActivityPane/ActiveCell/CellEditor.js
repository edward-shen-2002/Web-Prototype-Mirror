import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { Editable } from "slate-react";

const Leaf = ({ attributes, children, leaf }) => {
  if(leaf.bold) children = <strong>{children}</strong>;
  if(leaf.italic) children = <em>{children}</em>;
  if(leaf.underline) children = <u>{children}</u>;

  return <span {...attributes}>{children}</span>;
};

// ! Only one element for now
const Element = ({ attributes, children, element }) => (
  <p {...attributes}>{children}</p>
);

const CellEditor = () => {
  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const activeCellInputAutoFocus = useSelector(({ 
    ui: { 
      excel: { 
        activeCellInputAutoFocus
      } 
    } 
  }) => activeCellInputAutoFocus);

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      autoFocus={activeCellInputAutoFocus}
      readOnly={true}
    />
  )
};

export default CellEditor;
