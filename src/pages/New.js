import React, { lazy, Suspense } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import NewHabitCategorySkeleton from '../components/newHabit/NewHabitCategorySkeleton';
import NewHabitPresetListSkeleton from '../components/newHabit/NewHabitPresetListSkeleton';

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
    </Switch>
  );
};

export default New;
