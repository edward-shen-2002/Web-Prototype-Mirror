import React, { useState, Fragment, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { Link } from 'react-router-dom'

import navigationConfig from './config'
import { useCallback } from 'react'
import TopItemList from '../TopItemList/TopItemList'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    display: 'flex',
    marginLeft: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexItem: {
    marginLeft: 'auto',
    margin: '0',
  },
  title: {
    color: 'white',
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
    },
  },
}))

const HeaderHandle = ({ open, classes, handleDrawerOpen, isTopMenu }) => {
  return (
    !isTopMenu && (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    )
  )
}

const HeaderTitle = ({ title }) => (
  <Typography variant="h6" noWrap>
    {title}
  </Typography>
)

const Header = ({ title, classes, open, config, handleDrawerOpen }) => {
  const [isTopMenu, setTopMenu] = useState(true)
  const [isMobile, setMobile] = useState(
    window.matchMedia('(max-width: 1000px)').matches
  )

  useEffect(() => {
    const handler = (e) => setMobile(e.matches)
    window.matchMedia('(max-width: 1000px)').addListener(handler)
    setTopMenu(!isMobile)
  }, [isMobile])
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.flex}>
        <HeaderHandle
          open={open}
          classes={classes}
          handleDrawerOpen={handleDrawerOpen}
          isTopMenu={isTopMenu}
        />
        <Link to="/" className={classes.title}>
          <HeaderTitle title={title} />
        </Link>
        {isTopMenu && (
          <TopItemList config={config} classes={classes} isMobile={isMobile} />
        )}
        <FormControlLabel
          className={classes.flexItem}
          control={
            <Switch
              checked={isTopMenu}
              onChange={() => setTopMenu(!isTopMenu)}
              aria-label="login switch"
            />
          }
          label={isTopMenu ? 'Top' : 'Left'}
        />
      </Toolbar>
    </AppBar>
  )
}

const DrawerHandle = ({ title, classes, handleDrawerClose, theme }) => (
  <div className={classes.toolbar}>
    <Typography className={classes.toolbarTitle}>{title}</Typography>
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  </div>
)

const MenuItemIcon = ({ icon }) => <ListItemIcon>{icon}</ListItemIcon>

const MenuItemLink = ({ name, icon, url }) => (
  <ListItem component={url && Link} button to={url}>
    <MenuItemIcon icon={icon} />
    <ListItemText primary={name} />
  </ListItem>
)

const MenuItems = ({ menuItems }) => {
  return menuItems.map((menuItem, index) => (
    <MenuItemLink
      key={`${menuItem.type}-${menuItem.name}-${index}`}
      {...menuItem}
    />
  ))
}

const MenuItemsList = ({ menuItems }) => (
  <List component="div" disablePadding>
    <MenuItems menuItems={menuItems} />
  </List>
)

const MenuDrawerItems = ({ menuItems, open }) => (
  <Collapse in={open} timeout="auto" unmountOnExit>
    <MenuItemsList menuItems={menuItems} />
  </Collapse>
)

const MenuDrawerTitle = ({ button = true, name, icon, open, handleClick }) => (
  <ListItem button={button} onClick={handleClick}>
    {icon && <MenuItemIcon icon={icon} />}
    <ListItemText primary={name} />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
)

const MenuDrawer = ({ name, icon, children }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(() => setOpen(!open), [open])

  return (
    <Fragment>
      <MenuDrawerTitle name={name} icon={icon} handleClick={handleToggle} />
      <MenuDrawerItems open={open} menuItems={children} />
    </Fragment>
  )
}

const NavigationContent = ({ config }) => {
  return config.map((item, index) => {
    let Component

    const { type, name } = item

    switch (type) {
      case 'drawer':
        Component = MenuDrawer
        break

      case 'divider':
        Component = Divider
        break

      case 'title':
      case 'menu':
      default:
        Component = MenuItemLink
        break
    }

    return <Component key={`${type}-${name}-${index}`} {...item} />
  })
}

const NavigationDrawer = ({
  title,
  open,
  theme,
  config,
  classes,
  handleDrawerClose,
}) => (
  <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
      paper: classes.drawerPaper,
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
)

const AuthPage = ({
  headerTitle = 'MOHLTC - Generic Data Collection Tool',
  drawerTitle = 'MOHLTC - GDCT',
  config = navigationConfig,
  children,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const style = open
    ? { paddingTop: '5.7rem' }
    : { paddingTop: '5.7rem', marginLeft: `-${drawerWidth}px` }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        title={headerTitle}
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        config={config}
      />
      <NavigationDrawer
        title={drawerTitle}
        theme={theme}
        classes={classes}
        open={open}
        config={config}
        handleDrawerClose={handleDrawerClose}
      />
      <main
        style={style}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
    </div>
  )
}

export default AuthPage
