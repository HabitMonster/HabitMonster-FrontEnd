import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  font-weight: var(--font-weight-semiBold);
  color: var(--bg-selected-light);
  font-size: var(--font-xs);
  line-height: 17px;
  margin-bottom: 6px;
`;

export default SubTitleOuter;
