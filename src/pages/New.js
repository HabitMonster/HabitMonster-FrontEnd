import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AddDetail, CategoryList } from '../components/habit';

const New = () => {
  const [selectedCategory, setSelectedCategory] = useState({});
  console.log(selectedCategory);

  return (
    <>
      <Route exact path="/new">
        <CategoryList onCategorySelected={setSelectedCategory} />
      </Route>
      <Route exact path="/new/detail">
        <AddDetail />
      </Route>
    </>
  );
};

export default New;
