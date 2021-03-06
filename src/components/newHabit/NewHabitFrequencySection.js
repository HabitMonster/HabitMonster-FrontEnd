import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SubTitleOuter } from '../common';

import { setFontStyles, setFlexStyles } from '../../styles';

const NewHabitFrequencySection = ({ frequency, onChange }) => {
  const increment = () =>
    onChange((prev) => (prev === 10 ? prev : Number(prev) + 1));
  const decrement = () =>
    onChange((prev) => (prev === 1 ? prev : Number(prev) - 1));

  const handleChange = (e) =>
    onChange(
      e.target.value.length >= 2
        ? Number(e.target.value[1])
        : Number(e.target.value) > 10
        ? 9
        : Number(e.target.value),
    );

  return (
    <SubTitleOuter subTitle="하루에 몇 번 할까요?">
      <HelperText>숫자 영역을 클릭하여 직접 입력할 수 있어요</HelperText>
      <Wrapper>
        <div onClick={decrement}>
          <div></div>
        </div>
        <NumberInput
          type="number"
          value={frequency}
          onChange={handleChange}
          maxLength={10}
        />
        <div onClick={increment}>
          <div></div>
        </div>
      </Wrapper>
    </SubTitleOuter>
  );
};

NewHabitFrequencySection.propTypes = {
  frequency: PropTypes.number,
  onChange: PropTypes.func,
};

const Wrapper = styled.div`
  display: flex;
  height: 40px;

  & div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-primary);
    ${setFlexStyles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}

    color: var(--color-primary);
    cursor: pointer;
    position: relative;

    & div {
      width: 25%;
      height: 5%;
      background: #c4c4c4;
      border-radius: 0;
    }
  }

  & div:last-child div::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
    background: inherit;
    transform: rotate(90deg);
  }
`;
const HelperText = styled.span`
  display: block;
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
  margin-bottom: 6px;
`;
const NumberInput = styled.input`
  height: 100%;
  flex: 1;

  text-align: center;
  padding: 4px 8px;
  background: var(--bg-primary);
  border-radius: var(--border-radius-semi);
  border: none;
  ${setFontStyles({
    color: 'primary',
    fontSize: 's',
    fontWeight: 'bold',
    lineHeight: '18px',
  })}
  margin: 0 11px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`;

export default NewHabitFrequencySection;
