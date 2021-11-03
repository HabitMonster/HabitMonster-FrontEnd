import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { AddDetail, CategoryList, HabitPreset } from '../components/habit';

const New = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <CategoryList />
      </Route>
      <Route path={`${path}/:categoryId/preset`}>
        <HabitPreset />
      </Route>
      <Route path={`${path}/:categoryId/detail`}>
        <AddDetail />
      </Route>
    </>
  );
};

export default New;
