import React, { lazy, Suspense } from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';

import {
  NewHabitCategorySkeleton,
  NewHabitPresetListSkeleton,
} from '../components/newHabit';

const NewHabitCategoryList = lazy(() => import('./NewHabitCategoryList'));
const NewHabitPresetList = lazy(() => import('./NewHabitPresetList'));
const NewHabitForm = lazy(() => import('./NewHabitForm'));

const New = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Suspense fallback={<NewHabitCategorySkeleton />}>
          <NewHabitCategoryList />
        </Suspense>
      </Route>
      <Route path={`${path}/:categoryId/preset`}>
        <Suspense fallback={<NewHabitPresetListSkeleton />}>
          <NewHabitPresetList />
        </Suspense>
      </Route>
      <Route path={`${path}/:categoryId/detail`}>
        <NewHabitForm />
      </Route>
      <Redirect from="*" to="/new" />
    </Switch>
  );
};

export default New;
