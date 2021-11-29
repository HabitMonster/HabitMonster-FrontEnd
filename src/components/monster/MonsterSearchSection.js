import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { SearchIcon } from '../../assets/icons/common';
import { FeedbackIcon } from '../../assets/icons/forTest';
import { whiteOpacity } from '../../styles/Mixin';

const MonsterSearchSection = () => {
  const history = useHistory();

  return (
    <Header>
      <FeedbackLink
        href="https://forms.gle/H9fYGuAomKwzo5ZD6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <FeedbackIcon />
          <span>피드백</span>
        </div>
      </FeedbackLink>
      <SearchIcon
        style={{ cursor: 'pointer' }}
        onClick={() => history.push('/search')}
      />
    </Header>
  );
};

const Header = styled.header`
  height: 32px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedbackLink = styled.a`
  height: 32px;
  background: #7d3cff;
  padding: 4px 14px;
  border-radius: var(--border-radius-checkBtn);
  text-decoration: none;
  cursor: pointer;
  z-index: 7;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  & div {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  & a {
    text-decoration: none;
  }
  & span {
    font-size: var(--font-xs);
    font-weight: var(--weight-bold);
    line-height: 17px;
    ${whiteOpacity('0.8')};
  }
`;

export default MonsterSearchSection;
