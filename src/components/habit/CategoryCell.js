import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CategoryCell = ({ srcs, selected, onCategorySelected }) => {
  return (
    <GategoryWrapper
      selected={selected}
      onClick={() => onCategorySelected(srcs.name)}
    >
      <img
        src={srcs[selected ? 'active' : 'inactive']}
        alt={`category: ${srcs.name}`}
      />
      <span>{srcs.name}</span>
    </GategoryWrapper>
  );
};

CategoryCell.propTypes = {
  srcs: PropTypes.shape({
    name: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    inactive: PropTypes.string.isRequired,
  }),
  selected: PropTypes.bool.isRequired,
  onCategorySelected: PropTypes.func.isRequired,
};

const GategoryWrapper = styled.div`
  width: 94px;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  background: var(--color-white);
  border: 2px solid
    ${({ selected }) =>
      selected ? 'var(--color-purple)' : 'var(--color-gray)'};
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer;
  transition: 200ms border ease-in;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    font-size: 13px;
    font-weight: var(--weight-semi-bold);
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.374px;
    color: ${({ selected }) => (selected ? '#7057fc' : '#999999')};
    transition: var(--animation-duration) color ease-in;
  }
`;

export default CategoryCell;
