import React, { PureComponent } from "react";

import "./Headers.scss";

const HeaderComponents = ({ headerStyles, type }) => headerStyles.map((style, index) => (
  <div key={`header-${type}-${index}`} className="headerStyles" style={style}/>
));

class Headers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      headerStyles: []
    };
  }

  setStagnantSelectionAreasStyles(headerStyles) {
    this.setState({ headerStyles });
  }

  render() {
    const { headerStyles, type } = this.state;
    
    return (
      <HeaderComponents headerStyles={headerStyles} type={type}/>
    );
  }
}

export default Headers;