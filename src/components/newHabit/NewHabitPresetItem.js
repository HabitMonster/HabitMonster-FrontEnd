import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { renderDays } from '../../utils/date';

const NewHabitPresetItem = ({
  frequency,
  description,
  period,
  days,
  title,
  onClick,
  isSelected,
}) => {
  return (
    <Wrapper isSelected={isSelected} onClick={onClick}>
      <p>{title}</p>
      <span>{description}</span>
      <div style={{ display: 'flex' }}>
        <Chip isSelected={isSelected}>
          <div>{renderDays(days)}</div>
        </Chip>
        <Chip isSelected={isSelected}>
          <div>하루 {frequency}번</div>
        </Chip>
        <Chip isSelected={isSelected}>
          <div>{period}일</div>
        </Chip>
      </div>
    </Wrapper>
  );
};

NewHabitPresetItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  frequency: PropTypes.number.isRequired,
  period: PropTypes.number.isRequired,
  days: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  width: 312px;
  height: 109px;
  cursor: pointer;

  background: ${({ isSelected }) => (isSelected ? '#1c0054' : '#1e2025')};
  border: ${({ isSelected }) => (isSelected ? '1px solid #3b0a9d' : 'none')};
  border-radius: 4px;
  padding: 14px 16px;
  margin-bottom: 12px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  & p {
    color: #f8f8f8;
    font-weight: var(--font-weight-bold);
    margin-bottom: 4px;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 4px;
  }

  & span {
    display: block;
    color: #f8f8f8;
    opacity: 0.4;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 12px;
  }
`;

const Chip = styled.div`
  padding: 4px 8px;
  height: 24px;
  background: ${({ isSelected }) => (isSelected ? '#7d3cff' : '#313339')};
  border-radius: 4px;
  margin-right: 8px;
  color: var(--color-white);
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.374px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  & div {
    color: #f8f8f8;
    opacity: 0.8;
  }
`;

export default NewHabitPresetItem;
