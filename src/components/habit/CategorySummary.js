import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REM = 16;

const CategorySummary = ({ category }) => (
  <Wrapper widthFactor={category.length}>{category}</Wrapper>
);

CategorySummary.propTypes = {
  category: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  width: ${({ widthFactor }) => 30 + REM * widthFactor}px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 33px;

  font-weight: var(--weight-semi-bold);
  line-height: 19px;

  color: #7158fd;
  margin-top: 60px;
  margin-left: 16px;
`;
export default CategorySummary;
