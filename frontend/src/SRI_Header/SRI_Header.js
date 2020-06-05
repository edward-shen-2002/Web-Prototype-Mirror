import logo from "../images/brand/ON_POS_LOGO_WHITE.svg";
import SRIBar from "../images/brand/SRI.jpg";
import React from "react";

const SRI_Header = () => (
  <div className="header__container">
    <div className="header__bgnd">
      <img src={SRIBar} className="header__logoBar"/>
      <img src={logo} height={48} alt="MOH Logo" className="header__logo"/>
    </div>
  </div>
)

export default SRI_Header;