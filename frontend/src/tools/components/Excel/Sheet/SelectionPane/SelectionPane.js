import React, { Component, useRef, useEffect } from "react";

import { connect } from "react-redux";

import "./SelectionPane.scss";

// ! Consider using HOC - Selection(specificSelection)

const defaultStyle = {
  zIndex: 100000,
  position: "absolute",
  border: "2px solid rgba(75, 135, 255, 0.95)",
  background: "rgba(3, 169, 244, 0.05)",
  pointerEvents: "none",
  display: "none",
  // transition: "all 0.1s"
};

class SelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: { left: 0, top: 0, width: 0, height: 0 }
    };
  }

  update(style) {
    this.setState({ style });
  }

  reset() {
    if(this.state.style.width || this.state.style.height) {
      this.setState({ 
        style: { top: 0, width: 0, height: 0 }
      });
    }
  }

  render() {
    const style = { ...defaultStyle, ...this.state.style };
    return <div style={style}/>;
  }
}

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode } } }) => ({ selectionArea, isSelectionMode });

export let TopLeftSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    const { current } = sheetRef;
    const isCorrectPane = x1 >= x2 && y1 >= y2;

    if(current && isCorrectPane){
      const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
      const { top: topEnd, left: leftEnd } = current._getItemStyle(y2, x2);

      const width = leftStart + widthStart - leftEnd;

      const height = topStart + heightStart - topEnd;

      const style = { left: leftEnd, top: topEnd, width: width, height: height, display: null, zIndex: 100000 };

      if(selectionRef) selectionRef.current.update(style)
    } else {
      selectionRef.current.reset();
    }
  });

  return (
    <SelectionPane
      ref={selectionRef}
    />
  );
};

TopLeftSelectionPane = connect(mapSelectionAreaStateToProps)(TopLeftSelectionPane);

export let TopRightSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;
    const isCorrectPane = x1 < x2 && y1 > y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd } = current._getItemStyle(y2, x2);

        const width = leftEnd + widthEnd - leftStart;

        const height = topStart + heightStart - topEnd;

        const style = { left: leftStart, top: topEnd, width: width, height: height, display: null, zIndex: 100000 };

        if(selectionRef) selectionRef.current.update(style)
      }
    } else {
      selectionRef.current.reset();
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
    />
  );
};

TopRightSelectionPane = connect(mapSelectionAreaStateToProps)(TopRightSelectionPane);

export let BottomLeftSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;
    const isCorrectPane = x1 >= x2 && y1 < y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd } = current._getItemStyle(y2, x2);

        const width = leftStart + widthStart - leftEnd;

        const height = topEnd - topStart;

        const top = topStart - heightStart;
        
        const style = { left: leftEnd, top, width: width, height: height, display: null, zIndex: 100000 };

        if(selectionRef) selectionRef.current.update(style)
      }
    } else {
      selectionRef.current.reset();
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
    />
  );
};

BottomLeftSelectionPane = connect(mapSelectionAreaStateToProps)(BottomLeftSelectionPane);

export let BottomRightSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;
    const isCorrectPane = x1 < x2 && y1 <= y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);

        const width = leftEnd + widthEnd - leftStart;

        const height = topEnd + heightEnd - topStart;

        const style = { left: leftStart, top: topStart, width: width, height: height, display: null, zIndex: 100000 };

        if(selectionRef) selectionRef.current.update(style)
      }
    } else {
      selectionRef.current.reset();
    } 
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
    />
  );
};

BottomRightSelectionPane = connect(mapSelectionAreaStateToProps)(BottomRightSelectionPane);
