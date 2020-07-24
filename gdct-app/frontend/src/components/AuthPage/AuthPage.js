import React, { useState, Fragment, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import { Link } from 'react-router-dom';

import navigationConfig from './config';

const drawerWidth = 240;
const headerHeight = 55;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
  },
  appBar: {
    height: headerHeight,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  toolbarTitle: {
    marginLeft: 15,
  },
  toolbarHandle: {},
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: `${headerHeight}px !important`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    width: `calc(100% - ${drawerWidth}px)`,
    height: `calc(100% - ${headerHeight}px) !important`,
    marginTop: headerHeight,
    overflow: 'auto',
  },
}));

const HeaderHandle = ({ open, classes, handleDrawerOpen }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    className={clsx(classes.menuButton, {
      [classes.hide]: open,
    })}
  >
    <MenuIcon />
  </IconButton>
);

const HeaderTitle = ({ title }) => (
  <Typography variant="h6" noWrap>
    {title}
  </Typography>
);

const Header = ({ title, classes, open, handleDrawerOpen }) => (
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}
  >
    <Toolbar>
      <HeaderHandle open={open} classes={classes} handleDrawerOpen={handleDrawerOpen} />
      <HeaderTitle title={title} />
    </Toolbar>
  </AppBar>
);

const DrawerHandle = ({ title, classes, handleDrawerClose, theme }) => (
  <div className={classes.toolbar}>
    <Typography className={classes.toolbarTitle}>{title}</Typography>
    <IconButton className={classes.toolbarHandle} onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </div>
);

const MenuItemIcon = ({ icon }) => <ListItemIcon>{icon}</ListItemIcon>;

const MenuItemLink = ({ name, icon, url }) => (
  <ListItem component={url && Link} button to={url}>
    <MenuItemIcon icon={icon} />
    <ListItemText primary={name} />
  </ListItem>
);

const MenuItems = ({ menuItems }) => {
  return menuItems.map((menuItem, index) => (
    <MenuItemLink key={`${menuItem.type}-${menuItem.name}-${index}`} {...menuItem} />
  ));
};

const MenuItemsList = ({ menuItems }) => (
  <List component="div" disablePadding>
    <MenuItems menuItems={menuItems} />
  </List>
);

const MenuDrawerItems = ({ menuItems, open }) => (
  <Collapse in={open} timeout="auto" unmountOnExit>
    <MenuItemsList menuItems={menuItems} />
  </Collapse>
);

const MenuDrawerTitle = ({ button = true, name, icon, open, handleClick }) => (
  <ListItem button={button} onClick={handleClick}>
    {icon && <MenuItemIcon icon={icon} />}
    <ListItemText primary={name} />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
);

const MenuDrawer = ({ name, icon, children }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen(!open), [open]);

  return (
    <Fragment>
      <MenuDrawerTitle name={name} icon={icon} handleClick={handleToggle} />
      <MenuDrawerItems open={open} menuItems={children} />
    </Fragment>
  );
};

const NavigationContent = ({ config }) => {
  return config.map((item, index) => {
    let Component;

    const { type, name } = item;

    switch (type) {
      case 'drawer':
        Component = MenuDrawer;
        break;

      case 'divider':
        Component = Divider;
        break;

      case 'title':
      case 'menu':
      default:
        Component = MenuItemLink;
        break;
    }

    return <Component key={`${type}-${name}-${index}`} {...item} />;
  });
};

const NavigationDrawer = ({ title, open, theme, config, classes, handleDrawerClose }) => (
  <Drawer
    variant="permanent"
    className={clsx(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}
    classes={{
      paper: clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      }),
    }}
  >
    <DrawerHandle
      title={title}
      classes={classes}
      handleDrawerClose={handleDrawerClose}
      theme={theme}
    />
    <Divider />
    <NavigationContent config={config} />
  </Drawer>
);

const PageContent = ({ classes, children }) => <div className={classes.content}>{children}</div>;

const AuthPage = ({
  headerTitle = 'MOHLTC - Generic Data Collection Tool',
  drawerTitle = 'MOHLTC - GDCT',
  config = navigationConfig,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        title={headerTitle}
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <NavigationDrawer
        title={drawerTitle}
        theme={theme}
        classes={classes}
        open={open}
        config={config}
        handleDrawerClose={handleDrawerClose}
      />
      <PageContent classes={classes} children={children} />
    </div>
  );
};

export default AuthPage;
