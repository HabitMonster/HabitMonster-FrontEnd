import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '../components/newHabit';
import { Gnb } from '../components/gnb';
import { useFetchCategories } from '../hooks';
import CATEGORIES from '../assets/images/habit';

const NewHabitCategoryList = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const categories = useFetchCategories();

  const skeletons = [...Array(7).keys()].map((key) => ({
    id: key,
  }));

  return (
    <>
      <Wrapper>
        <NewHabitCategoryHelperText />
        <NewHabitCategoryGrid>
          {categories.length
            ? categories.map(({ categoryId, category: categoryName }) => (
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
              ))
            : skeletons.map((skeleton) => (
                <NewHabitCategoryCell key={skeleton.id} skeleton />
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
