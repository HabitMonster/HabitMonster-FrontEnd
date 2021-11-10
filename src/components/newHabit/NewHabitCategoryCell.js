import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewHabitCategoryCell = ({ src, name, onClick }) => {
  return (
    <GategoryWrapper onClick={onClick}>
      <img
        style={{ width: '30px', height: '30px' }}
        src={src}
        alt={`category: ${name}`}
      />
      <span>{name}</span>
    </GategoryWrapper>
  );
};

NewHabitCategoryCell.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const GategoryWrapper = styled.div`
  width: 150px;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 19px 28px 14px;
  background: #1e2025;
  border: 1px solid #3c4254;
  border-radius: 4px;
  cursor: pointer;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--font-weight-bold);
    text-align: center;
    letter-spacing: 0.374px;
    color: #999999;
  }
`;

export default NewHabitCategoryCell;
