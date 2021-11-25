import React, { Suspense } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import NewHabitCategoryList from './NewHabitCategoryList';
import NewHabitForm from './NewHabitForm';

import NewHabitCategorySkeleton from '../components/newHabit/NewHabitCategorySkeleton';
import NewHabitPresetListSkeleton from '../components/newHabit/NewHabitPresetListSkeleton';
import NewHabitPresetList from './NewHabitPresetList';

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
