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
  children: PropTypes.element.isRequired,
};

const SubTitle = styled.p`
  font-weight: var(--font-weight-semi-bold);
  color: #7d3cff;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 6px;
`;

export default SubTitleOuter;
