import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import DashBoard from './pages/DashBoard/DashBoard';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/dashboard" component={withAuthenticated(DashBoard)}></Route>
      <Route path="/signup" component={withUnAuthenticated(SignUp)}></Route>
      <Route path="/signin" component={withUnAuthenticated(SignIn)}></Route>
      <Route path="/" component={withUnAuthenticated(Home)}></Route>
    </Switch>
  </Router>
);

export default Routes;
