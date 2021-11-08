import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewHabitPresetItem = ({
  frequency,
  description,
  period,
  days,
  title,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <div>title: {title}</div>
      <div>desciprtion: {description}</div>
      <div>practiceDays: {days}</div>
      <div>frequency: 하루에 몇번 {frequency}</div>
      <Chip>
        <div>{period}일</div>
      </Chip>
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
};

const Wrapper = styled.div`
  width: 328px;
  height: 94px;
  position: relative;
  cursor: pointer;

  background: #edf2f7;
  border-radius: 11px;
  margin: 12px 0px;
  padding: 14px 16px;
`;

const Chip = styled.div`
  padding: 4px 8px;
  height: 24px;
  background: #cbd5e0;
  border-radius: var(--border-radius-checkBtn);
  position: absolute;
  top: 14px;
  right: 16px;
  color: var(--color-white);
  font-size: 13px;
  line-height: 16px;
  font-weight: var(--weight-semi-bold);
  letter-spacing: 0.374px;
`;

export default NewHabitPresetItem;
