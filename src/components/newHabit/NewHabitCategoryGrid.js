import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { disappearScrollbar, setFlexStyles } from '../../styles';

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
