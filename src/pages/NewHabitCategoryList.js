import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { categoryListSelector } from '../recoil/states/habit';

import CATEGORIES from '../assets/images/category';

import { Gnb } from '../components/gnb';
import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '../components/newHabit';

const NewHabitCategoryList = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const categories = useRecoilValue(categoryListSelector);

  return (
    <>
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
                    categoryId,
                    name: CATEGORIES[categoryName].name,
                  },
                });
              }}
            />
          ))}
        </NewHabitCategoryGrid>
      </Wrapper>
      <Gnb />
    </>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 24px;
  background: var(--bg-wrapper-gradient);
`;

export default NewHabitCategoryList;
