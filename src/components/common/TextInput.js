import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextInput = ({
  text,
  placeholder,
  onTextChanged,
  lengthValidationMode,
  errorMessage,
  maxLength,
}) => {
  const isValidated = text.length < maxLength;

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (lengthValidationMode && newValue.length > maxLength) {
      return;
    }

    onTextChanged(newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleInputChange}
        maxLength={maxLength}
        isValidated={isValidated}
      />
      {lengthValidationMode ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            {maxLength === text.length && (
              <ErrorHelperMessage>{errorMessage}</ErrorHelperMessage>
            )}
          </div>
          <div>
            <LengthHelperMessage>
              {text.length}/{maxLength}
            </LengthHelperMessage>
          </div>
        </div>
      ) : null}
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
};

TextInput.defaultProps = {
  placeholder: '',
  errorMessage: '',
  maxLength: Infinity,
  lengthValidationMode: false,
};

const Input = styled.input`
  width: 312px;
  height: 32px;
  background: inherit;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  padding: 4px;
  color: #f8f8f8;
  border: none;
  border-bottom: 1px solid
    ${({ isValidated }) =>
      isValidated ? 'rgba(248, 248, 248, 0.3)' : '#ef2f68'};
  margin-bottom: 4px;

  &:focus {
    outline: none;
  }
`;

const ErrorHelperMessage = styled.span`
  color: #ef2f68;
  font-size: 12px;
  line-height: 14px;
`;

const LengthHelperMessage = styled.span`
  color: #fff;
  opacity: 0.6;
  font-size: 12px;
  line-height: 14px;
`;

export default TextInput;
