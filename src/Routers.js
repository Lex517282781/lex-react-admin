import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/user" component={UserLayout} />
      <Route component={BasicLayout} />
    </Switch>
  </BrowserRouter>
);
