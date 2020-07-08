import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { getAppSysRolesRequest } from '../store/thunks/AppSysRole'
import { selectFactoryRESTResponseTableValues } from '../store/common/REST/selectors'
import { selectAppSysRolesStore } from '../store/AppSysRolesStore/selectors'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(sysRole, sysRoles, theme) {
  return {
    fontWeight:
      sysRoles.indexOf(sysRole) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function SignUp({ parentHandleChange }) {
  const dispatch = useDispatch()
  const { appSysRoles } = useSelector(
    (state) => ({
      appSysRoles: selectFactoryRESTResponseTableValues(selectAppSysRolesStore)(
        state
      ),
    }),
    shallowEqual
  )
  const classes = useStyles()
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [ext, setExt] = useState('')
  const [sysRoles, setSysRoles] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'title':
        setTitle(value)
        parentHandleChange(name, value)
        break
      case 'phoneNumber':
        setPhoneNumber(value)
        parentHandleChange(name, value)
        break
      case 'ext':
        setExt(value)
        parentHandleChange(name, value)
        break
      case 'sysRoles':
        setSysRoles(value)
        parentHandleChange(name, sysRoles)
        break
    }
    parentHandleChange(name, value)
  }

  console.log('sysRoles:', sysRoles)

  useEffect(() => {
    dispatch(getAppSysRolesRequest())
  }, [dispatch])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="title"
                name="title"
                value={title}
                variant="outlined"
                fullWidth
                id="title"
                label="Title"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                autoComplete="phoneNumber"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="ext"
                label="Ext"
                name="ext"
                value={ext}
                autoComplete="ext"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                name="sysRoles"
                value={sysRoles}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {appSysRoles.length !== 0 &&
                  appSysRoles.map((sysRole) => (
                    <MenuItem
                      key={sysRole._id}
                      value={`${sysRole.appSys}-${sysRole.role}`}
                      style={getStyles(sysRole._id, sysRoles, theme)}
                    >
                      {`${sysRole.appSys}-${sysRole.role}`}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
