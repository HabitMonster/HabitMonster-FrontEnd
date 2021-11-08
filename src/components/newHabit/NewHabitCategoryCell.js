import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewHabitCategoryCell = ({ src, name, onClick }) => {
  return (
    <GategoryWrapper onClick={onClick}>
      <img src={src} alt={`category: ${name}`} />
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
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  background: var(--color-white);
  border: 1.5px solid var(--color-title);
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    font-size: 13px;
    line-height: 16px;
    font-weight: var(--weight-bold);
    text-align: center;
    letter-spacing: 0.374px;
    color: var(--color-grey01);
  }
`;

export default NewHabitCategoryCell;
