import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';

import NewHabitCategoryList from './NewHabitCategoryList';
import NewHabitForm from './NewHabitForm';
import NewHabitPresetList from './NewHabitPresetList';

const New = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (Boolean(localStorage.getItem('isFirstLogin'))) {
      return history.replace('/monster');
    }
  }, []);

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
