import React from "react";

import "./Headers.scss";

const HeaderSelection = ({ headerStyles, type }) => headerStyles.map((style, index) => (
  <div key={`header-${type}-${index}`} className="headerStyles" style={style}/>
));

export default HeaderSelection;