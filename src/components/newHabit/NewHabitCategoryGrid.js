import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { disappearScrollbar } from '../../styles/Mixin';

const NewHabitCategoryGrid = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

NewHabitCategoryGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const GridContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default NewHabitCategoryGrid;
