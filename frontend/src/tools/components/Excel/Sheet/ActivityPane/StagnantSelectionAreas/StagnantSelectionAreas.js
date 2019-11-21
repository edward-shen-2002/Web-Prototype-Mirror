import React, { PureComponent } from "react";

import "./StagnantSelectionAreas.scss";

const StagnantSelectionAreasComponents = ({ stagnantSelectionAreasStyles }) => stagnantSelectionAreasStyles.map((style, index) => (
  <div key={index} className="stagnantSelectionArea" style={style}/>
));

class StagnantSelectionAreas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stagnantSelectionAreasStyles: []
    };
  }

  setStagnantSelectionAreasStyles(stagnantSelectionAreasStyles) {
    this.setState({ stagnantSelectionAreasStyles });
  }

  render() {
    const { stagnantSelectionAreasStyles } = this.state;
    
    return (
      <StagnantSelectionAreasComponents stagnantSelectionAreasStyles={stagnantSelectionAreasStyles}/>
    )
  }
}

export default StagnantSelectionAreas;