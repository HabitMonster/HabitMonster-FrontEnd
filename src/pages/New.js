import React from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';

import PrivateRoute from '../components/route/PrivateRoute';
import NewHabitCategoryList from './NewHabitCategoryList';
import NewHabitForm from './NewHabitForm';
import NewHabitPresetList from './NewHabitPresetList';

const New = () => {
  const { path } = useRouteMatch();

  if (localStorage.getItem('isFirstLogin') === 'true') {
    return <Redirect to="/monster" />;
  }

  return (
    <>
      <PrivateRoute exact path={path}>
        <NewHabitCategoryList />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:categoryId/preset`}>
        <NewHabitPresetList />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:categoryId/detail`}>
        <NewHabitForm />
      </PrivateRoute>
    </>
  );
};

export default New;
