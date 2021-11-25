import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { disappearScrollbar } from '../../styles/Mixin';

const CategoryMenu = ({ categorization, classHandler }) => {
  const categoryList = [
    { id: 'all', name: '전체' },
    { id: 1, name: '건강' },
    { id: 2, name: '공부' },
    { id: 3, name: '일상' },
    { id: 4, name: '감정관리' },
    { id: 5, name: '관계' },
    { id: 6, name: '취미' },
    { id: 7, name: '기타' },
  ];

  return (
    <CategorySection>
      {categoryList.map((category) => {
        return (
          <Menu
            key={category.id}
            className={categorization.name === category.name ? 'active' : ''}
            onClick={() => {
              classHandler(category.id, category.name);
            }}
          >
            <span>{category.name}</span>
          </Menu>
        );
      })}
    </CategorySection>
  );
};

export default CategoryMenu;

CategoryMenu.propTypes = {
  categorization: PropTypes.object.isRequired,
  classHandler: PropTypes.func.isRequired,
};

const CategorySection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 54px;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  overflow-x: scroll;
  border-collapse: collapse;
  box-sizing: border-box;

  ${disappearScrollbar()};
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
  margin-right: 28px;
  cursor: pointer;
  box-sizing: border-box;
  opacity: 0.6;

  &.active {
    opacity: 1;
    border-bottom: 2px solid var(--color-white);
  }

  & span {
    color: var(--color-white);
  }
`;
