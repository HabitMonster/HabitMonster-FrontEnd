import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { whiteOpacity } from '../../styles/Mixin';

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
  width: 100%;
  cursor: pointer;

  background: ${({ isSelected }) =>
    isSelected ? 'var(--bg-selected)' : 'var(--bg-primary)'};
  border: ${({ isSelected }) =>
    isSelected ? '1px solid var(--bg-active)' : '1px solid var(--bg-primary)'};
  border-radius: var(--border-radius-semi);
  padding: 16px 24px;
  margin-bottom: 12px;

  transition: all var(--animation-duration) cubic-bezier(0.42, 0, 0.58, 1);
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  & p {
    color: var(--color-primary);
    font-weight: var(--weight-bold);
    font-size: var(--font-l);
    line-height: 22px;
    margin-bottom: 4px;
  }

  & span {
    display: block;
    color: var(--color-primary-deemed);
    font-size: var(--font-xs);
    line-height: 17px;
    margin-bottom: 12px;
  }
`;

const Chip = styled.div`
  padding: 4px 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isSelected }) =>
    isSelected ? 'var(--bg-selected-light)' : '#313339'};
  border-radius: var(--border-radius-semi);
  transition: all var(--animation-duration) cubic-bezier(0.42, 0, 0.58, 1);
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  & div {
    ${whiteOpacity('0.8')};
    font-size: var(--font-xxs);
    line-height: 14px;
  }
`;

export default NewHabitPresetItem;
