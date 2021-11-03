import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { AddDetail, CategoryList } from '../components/habit';
import HabitPreset from '../components/habit/HabitPreset';

const New = () => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <CategoryList onCategorySelected={setSelectedCategory} />
      </Route>
      <Route path={`${path}/:categoryId/preset`}>
        <HabitPreset category={selectedCategory} />
      </Route>
      <Route path={`${path}/:categoryId/detail`}>
        <AddDetail category={selectedCategory} />
      </Route>
    </>
  );
};

export default New;
