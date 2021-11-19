import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import NewHabitCategoryList from './NewHabitCategoryList';
import NewHabitForm from './NewHabitForm';
import NewHabitPresetList from './NewHabitPresetList';

// import PrivateRoute from '../components/PrivateRoute';

const New = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <NewHabitCategoryList />
      </Route>
      <Route path={`${path}/:categoryId/preset`}>
        <NewHabitPresetList />
      </Route>
      <Route path={`${path}/:categoryId/detail`}>
        <NewHabitForm />
      </Route>
    </Switch>
  );
};

export default New;
