import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MandatoryInfo from './MandatoryInfo';
import ExtraInfo from './ExtraInfo';
import Review from './Review';

import { getAppSysRolesRequest } from '../store/thunks/AppSysRole';
import { selectFactoryRESTResponseTableValues } from '../store/common/REST/selectors';
import { selectAppSysRolesStore } from '../store/AppSysRolesStore/selectors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        GDCT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Mandatory step', 'Extra step', 'Review your info.'];

function getStepContent(step, parentHandleChange, data) {
  switch (step) {
    case 0:
      return <MandatoryInfo parentHandleChange={parentHandleChange} />;
    case 1:
      return <ExtraInfo parentHandleChange={parentHandleChange} />;
    case 2:
      return <Review {...data} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function SignUp() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ext, setExt] = useState('');
  const [sysRoles, setSysRoles] = useState([]);

  const dispatch = useDispatch();
  const { appSysRoles } = useSelector(
    state => ({
      appSysRoles: selectFactoryRESTResponseTableValues(selectAppSysRolesStore)(state),
    }),
    shallowEqual,
  );

  const isValid = () => {
    console.log(
      email.length !== 0,
      password.length !== 0,
      firstName.length !== 0,
      lastName.length !== 0,
    );
    return (
      email.length !== 0 && password.length !== 0 && firstName.length !== 0 && lastName.length !== 0
    );
  };

  const handleNext = () => {
    if (isValid()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const parentHandleChange = (name, value) => {
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'ext':
        setExt(value);
        break;
      case 'sysRoles':
        const rtn = [];
        value.forEach(e => {
          const [appSys, role] = e.split('-');
          appSysRoles.forEach(e => {
            console.log(e.appSys, e.role, e.appSys === appSys, e.role === role);
          });
          const appSysRole = appSysRoles.find(e => e.appSys === appSys && e.role === role);
          rtn.push(appSysRole);
        });
        setSysRoles(rtn);
        break;
    }
  };

  useEffect(() => {
    dispatch(getAppSysRolesRequest());
  }, [dispatch]);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for sign up in GDCT.
              </Typography>
              <Typography variant="subtitle1">
                You will be redirected to authorized pages. Please wait in 3 sec.
              </Typography>
              {setTimeout(e => {
                window.location.href = '/login';
              }, 3000)}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, parentHandleChange, {
                firstName,
                lastName,
                email,
                title,
                phoneNumber,
                ext,
                sysRoles,
              })}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
      <Copyright />
    </main>
  );
}
