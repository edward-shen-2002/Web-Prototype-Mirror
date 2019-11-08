import React from "react";

import { connect } from "react-redux";

import { resetUserState } from "tools/redux";

import { authAxios } from "tools/rest";

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';

import { AppHeaderDropdown, AppSidebarToggler, AppNavbarBrand } from "@coreui/react";

import { AppBar, Toolbar } from "@material-ui/core";

import { ROUTE_PUBLIC_LOGIN } from "constants/routes";
import { REST_AUTH_LOGOUT } from "constants/rest";

import logo from "images/brand/ON_POS_LOGO_BLUE_RGB.svg";

import "./Header.scss";

const AccountMenuHeader = () => (
  <DropdownItem header className="text-center">
    <strong>Account</strong>
  </DropdownItem>
);

const LogoutNav = ({ handleLogout }) => (
  <DropdownItem onClick={handleLogout}>
    <i className="fa fa-lock"/>
    Logout
  </DropdownItem>
)

const AccountMenu = ({ handleLogout }) => (
  <DropdownMenu right>
    <AccountMenuHeader/>
    <LogoutNav handleLogout={handleLogout}/>  
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
  <Toolbar variant="dense">
    <AppSidebarToggler className="d-lg-none" display="md" mobile><i className="fa fa-bars"/></AppSidebarToggler>
    <AppSidebarToggler className="d-md-down-none" display="lg"><i className="fa fa-bars"/></AppSidebarToggler>
    <AppNavbarBrand full={{ src: logo, height: 48, alt: "MOH Logo" }}/>
    <AccountMenuNav handleLogout={handleLogout}/>
  </Toolbar>
);

const mapDispatchToProps = (dispatch, { history }) => ({ 
  handleLogout: () => {
    authAxios.post(REST_AUTH_LOGOUT)
      .catch((error) => console.error(error))
      .finally(() => {
        resetUserState(dispatch);
        history.push(ROUTE_PUBLIC_LOGIN);
      });
  }
});

let AppHeader = ({ handleLogout }) => (
  <AppBar position="relative" className="appHeader" color="default">
    <AppNavigation handleLogout={handleLogout}/>
  </AppBar>
);

AppHeader = connect(null, mapDispatchToProps)(AppHeader);

export default AppHeader;