import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoryGrid = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

CategoryGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const GridContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 21px;
  row-gap: 24px;
  align-items: center;
  justify-content: center;
`;

export default CategoryGrid;
