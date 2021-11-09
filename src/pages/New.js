import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import NewHabitCategoryList from './NewHabitCategoryList';
import NewHabitForm from './NewHabitForm';
import NewHabitPresetList from './NewHabitPresetList';

const New = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <NewHabitCategoryList />
      </Route>
      <Route path={`${path}/:categoryId/preset`}>
        <NewHabitPresetList />
      </Route>
      <Route path={`${path}/:categoryId/detail`}>
        <NewHabitForm />
      </Route>
    </>
  );
};

export default New;
