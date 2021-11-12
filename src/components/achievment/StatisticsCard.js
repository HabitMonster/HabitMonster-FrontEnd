import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { whiteOpacity } from '../../styles/Mixin';

import { renderDays } from '../../utils/date';

const StatisticsCard = () => {
  return <Wrapper isSelected={isSelected} onClick={onClick}></Wrapper>;
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
  cursor: pointer;

  background: ${({ isSelected }) =>
    isSelected ? 'var(--bg-selected)' : 'var(--bg-primary)'};
  border: ${({ isSelected }) =>
    isSelected ? '1px solid var(--bg-active)' : 'none'};
  border-radius: 4px;
  padding: 16px 24px;
  margin-bottom: 12px;

  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  & p {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
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

const CardWrap = styled.div`
  width: 312px;
  height: 112px;
  border-radius: 12px;
  background-color: #1e2025;
  box-shadow: 0px 0px 4px rgba(125, 123, 138, 0.08);

  & div {
    ${whiteOpacity('0.8')};
    font-size: var(--font-xxs);
    line-height: 14px;
  }
`;

export default NewHabitPresetItem;
