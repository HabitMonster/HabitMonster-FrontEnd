import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { whiteOpacity } from '../../styles/Mixin';

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
  width: 100%;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 19px 28px 14px;
  background: var(--bg-primary);
  border: 1px solid #3c4254;
  border-radius: var(--border-radius-semi);
  cursor: pointer;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    font-size: var(--font-xs);
    line-height: 17px;
    font-weight: var(--weight-semi-bold);
    text-align: center;
    ${whiteOpacity('0.8')};
  }
`;

export default NewHabitCategoryCell;
