import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { SearchIcon } from '../../assets/icons/common';
import { FeedbackIcon } from '../../assets/icons/forTest';
import { whiteOpacity } from '../../styles/Mixin';

const Feedback = () => {
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
  padding: 0 24px;
  width: 100%;
  height: 32px;
  z-index: 3;
  position: absolute;
  top: 24px;
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

export default Feedback;
