import React, { Component, useRef, useEffect } from "react";

import "./SelectionPane.scss";

const DefaultStyle = {
  zIndex: 100000,
  position: 'absolute',
  border: '2px solid rgba(75, 135, 255, 0.95)',
  background: 'rgba(3, 169, 244, 0.05)',
  pointerEvents: 'none',
  display: 'none',
  transition: 'all 0.1s',
};

// ! Consider using HOC - Selection(specificSelection)

class SelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: { 
        left: 1,
        top: 1,
        width: 10,
        height: 10
       }
    };
  }

  update(style) {
    this.setState({ style });
  }

  render() {
    return <div style={Object.assign({}, DefaultStyle, this.state.style)}>test</div>;
  }
}

export const TopLeftSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea 
}) => {
  useEffect(() => {
    if(sheetRef) {
      const { current } = sheetRef;
  
      if(current){
        const { x1, y1, x2, y2 } = selectionArea;

        const { top, left } = current._getItemStyle(x1, y1);
  
        const style = {
          left,
          top,
          width: 500,
          height: 600,
          display: null,
          zIndex: 100000
        };
  
        if(selectionRef) selectionRef.current.update(style)
      }
    }
  });
  return (
    <SelectionPane
      ref={selectionRef}
    />
  );
};

export const TopRightSelectionPane = () => {
  const selectionRef = useRef(null);

};

export const BottomLeftSelectionPane = () => {
  const selectionRef = useRef(null);

};

export const BottomRightSelectionPane = () => {
  const selectionRef = useRef(null);

};