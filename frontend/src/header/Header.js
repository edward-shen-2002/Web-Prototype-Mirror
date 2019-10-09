import React from "react";

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';

import { AppHeaderDropdown, AppSidebarToggler, AppNavbarBrand } from "@coreui/react";

import { AppBar, Toolbar } from "@material-ui/core";

import logo from "images/brand/ON_POS_LOGO_BLUE_RGB.svg";
import sygnet from "images/brand/ON_POS_LOGO_RGB_BLUE_NO_FONT_SPACED.svg";

import "./Header.scss";

const AccountMenu = ({ handleLogout }) => (
  <DropdownMenu right>
    <DropdownItem header tag="div" className="text-center">
      <strong>Account</strong>
    </DropdownItem>
    <DropdownItem onClick={handleLogout}>
      <i className="fa fa-lock"/>
      Logout
    </DropdownItem>
  </DropdownMenu>
);

const AccountMenuToggle = () => (
  <DropdownToggle nav>
    <i className="mdi mdi-account mdi-36px"/>
  </DropdownToggle>
);

const AccountMenuContainer = ({ handleLogout }) => (
  <AppHeaderDropdown direction="down">
    <AccountMenuToggle/>
    <AccountMenu handleLogout={handleLogout}/>
  </AppHeaderDropdown>
);

const AccountMenuNav = ({ handleLogout }) => (
  <Nav className="ml-auto" navbar>
    <AccountMenuContainer handleLogout={handleLogout}/>
  </Nav>
);

const AppNavigation = ({ handleLogout }) => (
  <Toolbar className="appHeader__toolbar">
    <AppSidebarToggler className="appHeader__toggle" display="lg"/>
    <AppNavbarBrand full={{ src: logo, height: 48, alt: "MOH Logo" }} minimized={{ src: sygnet, height: 48, alt: "MOH Logo" }}/>
    <AccountMenuNav handleLogout={handleLogout}/>
  </Toolbar>
);

const AppHeader = ({ handleLogout }) => (
  <AppBar position="relative" className="appHeader" color="default">
    <AppNavigation handleLogout={handleLogout}/>
  </AppBar>
);

export default AppHeader;