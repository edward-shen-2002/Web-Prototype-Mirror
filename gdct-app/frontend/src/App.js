import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { CircularProgress, Grid } from '@material-ui/core';
import TemplateRouter from './views/TemplateRouter';
import COARouter from './views/COARouter';
import OrgRouter from './views/OrganizationRouter';
import AuthPage from './components/AuthPage';
import Statuses from './views/Statuses';
import Programs from './views/Programs';
import SheetNames from './views/SheetNames';
import RoleRouter from './views/RoleRouter';
import SubmissionRouter from './views/SubmissionRouter';
import ReportingPeriods from './views/ReportingPeriods';
import Error from './views/authError';
// import Signup from './views/authSignup'
import Login from './views/Login';
import SignUp from './views/SignUp';

import { ROUTE_WORKFLOW } from './constants/routes';
import WorkflowRouter from './views/WorkflowRouter/WorkflowRouter';
import GDCTMenu from './views/GDCTMenu';
import Logout from './views/Logout';
import AuthController from './controllers/Auth';
import './App.scss';

const PrivateRouter = ({ setLoggedIn }) => {
  return (
    <Switch>
      <Route path={ROUTE_WORKFLOW} component={WorkflowRouter} />
      <Route exact path="/" component={GDCTMenu} />
      <Route exact path="/template_manager" component={TemplateRouter} />
      <Route exact path="/COA_manager" component={COARouter} />
      <Route exact path="/role_manager" component={RoleRouter} />
      <Route exact path="/statuses" component={Statuses} />
      <Route exact path="/programs" component={Programs} />
      <Route exact path="/submission_manager" component={SubmissionRouter} />
      <Route exact path="/reportingPeriods" component={ReportingPeriods} />
      <Route exact path="/sheetNames" component={SheetNames} />
      <Route exact path="/organizations" component={OrgRouter} />
      <Route path="/logout" render={props => <Logout {...props} setLoggedIn={setLoggedIn} />} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
const PublicRouter = ({ setLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} setLoggedIn={setLoggedIn} />} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/auth/error" component={Error} />
      {/* <Route
        path="/login"
        render={(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
      /> */}
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    AuthController.profile()
      .then(res => {
        console.log(res);
        setLoggedIn(res.status === 'success');
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="appContainer">
      {isLoggedIn === null ? (
        <Grid container style={{ height: '100vh' }} justify="center" alignContent="center">
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : isLoggedIn ? (
        <AuthPage>
          <PrivateRouter setLoggedIn={setLoggedIn} />
        </AuthPage>
      ) : (
        <PublicRouter setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default App;
