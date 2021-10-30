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
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 22.5px;
  row-gap: 24px;
`;

export default CategoryGrid;
