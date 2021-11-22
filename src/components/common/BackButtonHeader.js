import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Back } from '../../assets/icons/common';

const BackButtonHeader = ({ onButtonClick, pageTitleText, children }) => {
  return (
    <Wrapper>
      <Back
        style={{ marginRight: '4px' }}
        fill="var(--color-primary)"
        onClick={() => onButtonClick()}
      />
      {pageTitleText && <PageTitle>{pageTitleText}</PageTitle>}
      {children && children}
    </Wrapper>
  );
};

BackButtonHeader.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  pageTitleText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BackButtonHeader.defaultProps = {
  pageTitleText: '',
};

const Wrapper = styled.div`
  max-width: 414px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 12px;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  & svg {
    cursor: pointer;
  }
`;

const PageTitle = styled.h1`
  font-weight: var(--weight-regular);
  font-size: var(--font-l);
  line-height: 21.6px;
  color: var(--color-primary);
`;

export default BackButtonHeader;
