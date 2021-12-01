import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { whiteOpacity, setFontStyles } from '../../styles';

const TextInput = ({
  text,
  placeholder,
  onTextChanged,
  lengthValidationMode,
  errorMessage,
  maxLength,
  idleHelperText,
  disabled,
}) => {
  const isIdle = !text.length;
  const isValidated = text.length <= maxLength;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onTextChanged(newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleInputChange}
        isValidated={isValidated}
        isIdle={isIdle}
        disabled={disabled}
      />
      <div />
      <HelperSection>
        {isIdle && <IdleHelperText>{idleHelperText}</IdleHelperText>}
        {lengthValidationMode ? (
          <>
            <div>
              {!isValidated && (
                <ErrorHelperMessage>{errorMessage}</ErrorHelperMessage>
              )}
            </div>
            <div>
              <LengthHelperMessage>
                <CurrentLength isValidated={isValidated}>
                  {text.length}
                </CurrentLength>
                /{maxLength}
              </LengthHelperMessage>
            </div>
          </>
        ) : null}
      </HelperSection>
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  onTextChanged: PropTypes.func.isRequired,
  lengthValidationMode: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  maxLength: PropTypes.number,
  idleHelperText: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  errorMessage: '',
  idleHelperText: '',
  maxLength: Infinity,
  lengthValidationMode: false,
  disabled: false,
};

const IdleHelperText = styled.span`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
`;

const Input = styled.input`
  ${setFontStyles({
    color: 'primary',
    fontSize: 's',
    lineHeight: '18px',
  })}
  background: inherit;
  border: none;
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 4px;
  padding-bottom: 0px;
  margin-bottom: 4px;

  transition: all 150ms ease-out;

  & + div {
    width: 100%;
    height: 1px;
    display: block;
    margin: 4px 0px;
    background-color: ${({ isValidated }) =>
      isValidated ? 'rgba(248, 248, 248, 0.3)' : 'var(--color-danger)'};
    transition: all 150ms ease-out;
  }

  &:focus {
    outline: none;

    & + div {
      background-color: ${({ isValidated }) =>
        isValidated ? 'var(--bg-active)' : 'var(--color-danger)'};
      transition: all 150ms ease-out;
    }
  }
`;

const HelperSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 14px;
`;

const ErrorHelperMessage = styled.span`
  ${setFontStyles({
    color: 'danger',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
`;

const LengthHelperMessage = styled.span`
  ${whiteOpacity('0.6')};
  ${setFontStyles({
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
`;

const CurrentLength = styled.b`
  ${({ isValidated }) =>
    setFontStyles({
      customColor: !isValidated ? 'var(--color-danger)' : 'inherit',
    })}
`;

export default TextInput;
