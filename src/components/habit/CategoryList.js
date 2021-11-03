import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { CategoryCell, CategoryGrid, CategoryHelperText } from '.';
import CATEGORIES from '../../assets/images/habit';

import H from '../../api/habits';
import { OK } from '../../constants/statusCode';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    async function getCategoryListFromServer() {
      try {
        const { data } = await H.getCategoryList();
        if (data.statusCode === OK) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
        history.replace('/');
      }
    }

    getCategoryListFromServer();
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
      </CategoryGrid>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 24px;
`;

export default CategoryList;
