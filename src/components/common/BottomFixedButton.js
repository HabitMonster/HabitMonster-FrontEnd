import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiteOpacity, setFontStyles, setFlexStyles } from '../../styles';

const BottomFixedButton = ({ onClick, text, condition = () => false }) => {
  return (
    <Button
      disabled={typeof condition === 'function' ? !condition() : false}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

BottomFixedButton.propTypes = {
  condition: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const Button = styled.button`
  width: 100%;
  max-width: 414px;
  margin: 0 auto;
  height: 80px;

  position: fixed;
  padding-left: inherit;
  bottom: 0;
  background: var(--bg-active);
  z-index: 3;
  border: none;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  })}

  ${setFontStyles({
    color: 'primary',
    fontSize: 'l',
    fontWeight: 'bold',
    lineHeight: '22px',
  })}
  transition: all 150ms ease-out;
  cursor: pointer;

  &:disabled {
    background: var(--bg-disabled);
    ${whiteOpacity(0.2)};
  }
`;

export default BottomFixedButton;
