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
  children: PropTypes.any,
};

BackButtonHeader.defaultProps = {
  pageTitleText: '',
};

const Wrapper = styled.div`
  max-width: 360px;
  height: 44px;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 22px;
  margin-left: 4px;
  color: #f8f8f8;
`;

export default BackButtonHeader;
