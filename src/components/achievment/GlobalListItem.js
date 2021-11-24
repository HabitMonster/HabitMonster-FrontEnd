import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// const StatisticItem = ({ data }) => {
const GlobalListItem = ({ data }) => {
  const { content, value } = data;

  return (
    <GlobalListItemWrap>
      <ContentsWrap>
        <p>{content}</p>
        <ValueText>{value}</ValueText>
      </ContentsWrap>
    </GlobalListItemWrap>
  );
};

export default GlobalListItem;

GlobalListItem.propTypes = {
  data: PropTypes.object,
  content: PropTypes.string,
  value: PropTypes.string,
};

const GlobalListItemWrap = styled.li`
  height: 102px;
  text-align: center;
  padding: 24px;
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  & :last-child {
    border-bottom: none;
  }
`;

const ContentsWrap = styled.div`
  padding: 0 20px;
  & p {
    display: flex;
    justify-content: flex-start;
    color: rgba(248, 248, 248, 0.6);
    font-size: var(--font-xs);
    font-weight: var(--weight-bold);
    line-height: 17px;
    margin-bottom: 8px;
  }
`;

const ValueText = styled.h6`
  display: flex;
  justify-content: flex-start;
  color: var(--color-primary);
  font-size: 22px;
  font-weight: var(--weight-semi-bold);
  line-height: 26px;
`;
