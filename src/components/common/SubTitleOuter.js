import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setFontStyles } from '../../styles';

const SubTitleOuter = ({ subTitle, children }) => {
  return (
    <section>
      <SubTitle>{subTitle}</SubTitle>
      {children}
    </section>
  );
};

SubTitleOuter.propTypes = {
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.any,
};

const SubTitle = styled.p`
  ${setFontStyles({
    customColor: 'var(--bg-selected-light)',
    fontSize: 'xs',
    fontWeight: 'semi-bold',
    lineHeight: '17px',
  })}
  margin-bottom: 6px;
`;

export default SubTitleOuter;
