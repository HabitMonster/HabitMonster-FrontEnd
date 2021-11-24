import React from 'react';
import { Gnb } from '../gnb';
import { Wrapper } from '../../pages/NewHabitCategoryList';
import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '.';

const skeletonCategories = [...Array(7).keys()].map((key) => ({
  id: key,
}));

const NewHabitCategorySkeleton = () => {
  return (
    <>
      <Wrapper>
        <NewHabitCategoryHelperText />
        <NewHabitCategoryGrid>
          {skeletonCategories.map((skeleton) => (
            <NewHabitCategoryCell key={skeleton.id} skeleton />
          ))}
        </NewHabitCategoryGrid>
      </Wrapper>
      <Gnb />
    </>
  );
};

export default NewHabitCategorySkeleton;
