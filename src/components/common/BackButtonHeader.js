import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Back } from '../../assets/icons/common';

const BackButtonHeader = ({ onButtonClick, pageTitleText }) => {
  return (
    <Wrapper>
      <Back fill="#f8f8f8" onClick={() => onButtonClick()} />
      {pageTitleText && <PageTitle>{pageTitleText}</PageTitle>}
    </Wrapper>
  );
};

BackButtonHeader.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  pageTitleText: PropTypes.string,
};

BackButtonHeader.defaultProps = {
  pageTitleText: '',
};

const Wrapper = styled.div`
  max-width: 360px;
  height: 44px;
  display: flex;
  align-items: center;

  & svg {
    cursor: pointer;
  }
`;

const PageTitle = styled.h1`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-l);
  line-height: 21.6px;
  margin-left: 4px;
  color: var(--color-primary);
`;

export default BackButtonHeader;
