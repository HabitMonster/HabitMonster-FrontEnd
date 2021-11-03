import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryCell from './CategoryCell';
import CategoryGrid from './CategoryGrid';
import CategoryHelperText from './CategoryHelperText';

import CATEGORIES from '../../assets/images/habit';

import A from '../testing';

const CategoryList = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    A.get('/categories')
      .then((res) => setCategories(res.data.categories))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Wrapper>
      <CategoryHelperText />
      <CategoryGrid>
        {categories.map(({ categoryId, category: categoryName }) => (
          <CategoryCell
            key={categoryId}
            src={CATEGORIES[categoryName].src}
            name={CATEGORIES[categoryName].name}
            onClick={() =>
              onCategorySelected({
                id: categoryId,
                name: CATEGORIES[categoryName].name,
              })
            }
          />
        ))}
      </CategoryGrid>
    </Wrapper>
  );
};

CategoryList.propTypes = {
  onCategorySelected: PropTypes.func.isRequired,
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 24px;
`;

export default CategoryList;
