import React from 'react';


import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import Dashboard from '~/pages/Dashboard';
import Documents from '~/pages/Documents';
import Profile from '~/pages/Profile';
import Collaboration from '~/pages/Collaboration';
import DocumentsOld from '~/pages/DocumentsOld';

export default function Routes() {


 

  return (
    <Switch>

      <Route path="/" exact component={Signin} />
      <Route path="/register" component={Signup} />
      <Route path="/dashboard" component={Dashboard}  isPrivate />
      <Route exact path="/users/:id/files" component={Documents} isPrivate />
      <Route exact path="/users/:id/filesold" component={DocumentsOld} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/collaborator" component={Collaboration} isPrivate />


    </Switch>
  );
}
