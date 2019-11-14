import React, { PureComponent, Fragment } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

const mapStateToProps = ({ ui: { excel: { selectionArea } } }) => ({ selectionArea });

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea))
});

let EventListener = ({ 
  eventListenerRef, 
  selectionArea, 
  columnCount,
  rowCount,
  handleUpdateSelectionArea
}) => (
  <EventRedux 
    ref={eventListenerRef} 
    rowCount={rowCount}
    columnCount={columnCount}
    selectionArea={selectionArea}
    handleUpdateSelectionArea={handleUpdateSelectionArea}
  />
);

EventListener = connect(mapStateToProps, mapDispatchToProps)(EventListener);

export default EventListener;


// TODO : Scroll into view once you reach the end of the end of the view scope
class EventRedux extends PureComponent {
  constructor(props) {
    super(props);
  }

  moveUp() {
    const { selectionArea, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1--;

    if(y1 > 0) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveDown() {
    const { selectionArea, rowCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1++;
    
    if(y1 < rowCount) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveLeft() {
    const { selectionArea, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1--;

    if(x1 > 0) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  moveRight() {
    const { selectionArea, columnCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1++;

    if(x1 < columnCount) handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  }

  render() {
    return <Fragment/>;
  }
};