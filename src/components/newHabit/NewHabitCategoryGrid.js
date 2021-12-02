import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { disappearScrollbar, setFlexStyles } from '../../styles/Mixin';

const NewHabitCategoryGrid = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

NewHabitCategoryGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const GridContainer = styled.section`
  width: 100%;
  ${setFlexStyles({
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default NewHabitCategoryGrid;
