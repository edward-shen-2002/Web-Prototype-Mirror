import React from "react";

import "./StagnantSelectionAreas.scss";

const StagnantSelectionAreas = ({ relevantStagnantSelectionAreasStyles }) => relevantStagnantSelectionAreasStyles.map((style, index) => (
  <div key={index} className="stagnantSelectionArea" style={style}/>
));

export default StagnantSelectionAreas;