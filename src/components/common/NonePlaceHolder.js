import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { None } from '../../assets/images/placeholder';

import { whiteOpacity, setFontStyles, setFlexStyles } from '../../styles/Mixin';

const NonePlaceHolder = ({ children }) => {
  return (
    <NoneTextWrapper>
      <None />
      <NoneTextDescription>{children}</NoneTextDescription>
    </NoneTextWrapper>
  );
};

NonePlaceHolder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const NoneTextWrapper = styled.section`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 24px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  })}

  & svg {
    margin-bottom: 32px;
  }
`;

const NoneTextDescription = styled.p`
  ${whiteOpacity('0.6')};
  ${setFontStyles({
    fontSize: 'xs',
    lineHeight: '21px',
  })}
  text-align: center;
`;

export default NonePlaceHolder;
