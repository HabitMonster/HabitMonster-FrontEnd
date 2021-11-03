import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { UpIcon, DownIcon } from '../../assets/icons/common';

const FrequencySetting = ({ currentValue, setValue }) => {
  const changevalue = (isIncrement) => {
    if (
      (currentValue === 0 && !isIncrement) ||
      (currentValue === 9 && isIncrement)
    ) {
      alert('올바르지 않은 숫자입니다.');
      return;
    }

    setValue((prev) => (isIncrement ? prev + 1 : prev - 1));
  };

  return (
    <FrequencyButton>
      <div>
        <UpIcon onClick={() => changevalue(true)} />
        <span>{currentValue}</span>
        <DownIcon onClick={() => changevalue(false)} />
      </div>
    </FrequencyButton>
  );
};

FrequencySetting.propTypes = {
  currentValue: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

const FrequencyButton = styled.div`
  width: 72px;
  height: 136px;
  margin-top: 18.5px;
  margin-right: 16px;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 21px;
  background: #f7f5ff;
  border: 1px solid #e5dcff;
  border-radius: 36px;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & svg {
      cursor: pointer;
    }
  }

  & span {
    font-weight: var(--weight-semi-bold);
    font-size: 40px;
    line-height: 48px;
    color: var(--color-purple);
  }
`;

export default FrequencySetting;
