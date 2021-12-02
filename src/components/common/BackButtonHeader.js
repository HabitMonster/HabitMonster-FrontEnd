import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import noop from '../../utils/noop';
import { Back } from '../../assets/icons/common';
import { setFontStyles, setFlexStyles } from '../../styles/Mixin';

const BackButtonHeader = ({
  onButtonClick,
  pageTitleText,
  children,
  marginBottom,
}) => {
  return (
    <Wrapper marginBottom={marginBottom}>
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
  onButtonClick: PropTypes.func,
  pageTitleText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  marginBottom: PropTypes.string,
};

BackButtonHeader.defaultProps = {
  pageTitleText: '',
  onButtonClick: noop,
};

const Wrapper = styled.div`
  max-width: 414px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : '12px'};
  height: 44px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}

  padding: 0 16px;

  & svg {
    cursor: pointer;
  }
`;

const PageTitle = styled.h1`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'l',
    fontWeight: 'regular',
    lineHeight: '21.6px',
  })}
`;

export default BackButtonHeader;
