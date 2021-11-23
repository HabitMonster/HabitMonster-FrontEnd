import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { whiteOpacity } from '../../styles/Mixin';

import { None } from '../../assets/images/placeholder';

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
  top: 60%;
  left: 60%;
  transform: translate(-60%, -60%);
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    margin-bottom: 32px;
  }
`;

const NoneTextDescription = styled.p`
  ${whiteOpacity('0.6')};
  font-size: var(--font-xs);
  line-height: 21px;
  text-align: center;
`;

export default NonePlaceHolder;
