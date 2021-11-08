import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '../components/newHabit';

import CATEGORIES from '../assets/images/habit';

import { useFetchCategories } from '../hooks';

const NewHabitCategoryList = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const categories = useFetchCategories();

  return (
    <Wrapper>
      <NewHabitCategoryHelperText />
      <NewHabitCategoryGrid>
        {categories.map(({ categoryId, category: categoryName }) => (
          <NewHabitCategoryCell
            key={categoryId}
            src={CATEGORIES[categoryName].src}
            name={CATEGORIES[categoryName].name}
            onClick={() => {
              history.push({
                pathname: `${path}/${categoryId}/preset`,
                state: {
                  id: categoryId,
                  name: CATEGORIES[categoryName].name,
                },
              });
            }}
          />
        ))}
      </NewHabitCategoryGrid>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 24px;
  background: #070707;
`;

export default NewHabitCategoryList;
