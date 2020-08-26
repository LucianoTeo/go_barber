import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Dashboard from '../pages/dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};
export default Routes;
