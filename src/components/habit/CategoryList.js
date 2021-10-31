import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';

import { BackButtonHeader } from '../common';
import CategoryCell from './CategoryCell';
import CategoryGrid from './CategoryGrid';
import CategoryHelperText from './CategoryHelperText';

import CATEGORIES from '../../assets/images/habit';

const CategoryList = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(() =>
    location.state ? location.state.category : '',
  );

  return (
    <Wrapper>
      <Header>
        <BackButtonHeader onButtonClick={() => history.replace('/')} />
      </Header>
      <CategoryHelperText />
      <CategoryGrid>
        {Object.keys(CATEGORIES).map((category) => (
          <CategoryCell
            key={category}
            srcs={CATEGORIES[category]}
            selected={selectedCategory === CATEGORIES[category].name}
            onCategorySelected={(newCategory) =>
              setSelectedCategory(newCategory)
            }
          />
        ))}
      </CategoryGrid>
      <ChoiceButton
        disabled={!selectedCategory}
        onClick={() =>
          history.push({
            pathname: '/new/detail',
            state: {
              category: selectedCategory,
            },
          })
        }
      >
        선택하기
      </ChoiceButton>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  padding-top: 44px;
`;

const ChoiceButton = styled.button`
  width: 328px;
  height: 56px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  bottom: 81px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 17px 52px;
  background: var(--color-purple);
  border-radius: 12px;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);
  line-height: 22px;
  color: var(--color-white);
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    background: var(--color-white);
    border: 1px solid var(--color-purple);
    border-radius: var(--border-radius-progress);
    color: var(--color-purple);
  }
`;

export default CategoryList;
