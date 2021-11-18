import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { whiteOpacity } from '../../styles/Mixin';

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
  height: 68px;

  position: fixed;
  bottom: 0;
  background: var(--bg-active);
  z-index: 3;
  border: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-weight: var(--weight-bold);
  font-size: var(--font-l);
  line-height: 22px;
  color: var(--color-primary);
  transition: all 150ms ease-out;
  cursor: pointer;

  &:disabled {
    background: var(--bg-disabled);
    ${whiteOpacity(0.2)};
  }
`;

export default BottomFixedButton;
