import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextInput = ({
  labelName,
  isTitle,
  id,
  value,
  onValueChanged,
  placeholder,
}) => {
  return (
    <InputWrapper isTitle={isTitle}>
      <label htmlFor={id}>{labelName}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onValueChanged}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

TextInput.propTypes = {
  isTitle: PropTypes.bool,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelName: PropTypes.string,
};

TextInput.defaultProps = {
  isTitle: false,
  placeholder: '',
  labelName: '',
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-left: 16px;
  font-weight: var(--weight-regular);
  font-size: 15px;
  line-height: 18px;

  color: var(--color-white);

  & label {
    margin-left: 15px;
    margin-bottom: 4px;
    font-size: 15px;
    color: var(--color-white);
    opacity: 1;

    &:not(:focus) {
      opacity: 0.4;
    }
  }

  & input {
    width: 343px;
    height: 52px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius-progress);
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-weight: ${({ isTitle }) => (isTitle ? '700' : '500')};
    font-size: ${({ isTitle }) => (isTitle ? '21px' : '17px')};
    line-height: ${({ isTitle }) => (isTitle ? '25px' : '20px')};
    color: var(--color-white);

    &::placeholder {
      font-weight: ${({ isTitle }) => (isTitle ? '700' : '500')};
      font-size: ${({ isTitle }) => (isTitle ? '21px' : '17px')};
      line-height: ${({ isTitle }) => (isTitle ? '25px' : '20px')};
      color: var(--color-white);
      opacity: 0.4;
    }

    &:focus {
      outline: none;
      border: 1px solid var(--color-white);
      border-radius: var(--border-radius-progress);
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export default TextInput;
