import React from 'react';
import styled from 'styled-components';

import { MonsterThumbnail } from '../components/common';

import { setFlexStyles, whiteOpacity } from '../styles';

// href="https://forms.gle/H9fYGuAomKwzo5ZD6"
//   target="_blank"
//   rel="noopener noreferrer"
const Credit = () => {
  return (
    <Wrapper>
      <h1>만든 사람들</h1>
      <h2>BACKEND</h2>
      <FeedbackLink
        href="https://github.com/Sollertia"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={3} width="32px" height="32px" />
        <span>최원빈</span>
      </FeedbackLink>
      <FeedbackLink
        href="https://github.com/Smallzoo-dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={8} width="32px" height="32px" />
        <span>강준규</span>
      </FeedbackLink>
      <FeedbackLink
        href="https://github.com/rockintuna"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={13} width="32px" height="32px" />
        <span>이정인</span>
      </FeedbackLink>

      <h2>FRONTEND</h2>
      <FeedbackLink
        href="https://github.com/devLily"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={23} width="32px" height="32px" />
        <span>배재경</span>
      </FeedbackLink>
      <FeedbackLink
        href="https://github.com/highjoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={28} width="32px" height="32px" />
        <span>윤상준</span>
      </FeedbackLink>
      <FeedbackLink
        href="https://github.com/nemyung"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MonsterThumbnail id={18} width="32px" height="32px" />
        <span>오세명</span>
      </FeedbackLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  color: var(--color-primary);

  & > h1 {
    font-size: 32px;
    font-weight: var(--weight-bold);
    margin-bottom: 24px;
  }

  & > h2 {
    font-size: 28px;
    font-weight: var(--weight-semi-bold);
    margin: 16px 0px;
  }
`;

const FeedbackLink = styled.a`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })};

  width: 100%;
  height: 64px;

  background: var(--bg-primary);
  border-radius: var(--border-radius-semi);
  font-weight: var(--weight-semi-bold);
  cursor: pointer;
  z-index: 7;
  text-decoration: none;
  margin-bottom: 12px;
  ${whiteOpacity('0.8')};

  & > span {
    margin-left: 12px;
  }
`;

export default Credit;
