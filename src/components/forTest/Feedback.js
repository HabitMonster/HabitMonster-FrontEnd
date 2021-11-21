import React from 'react';
import styled from 'styled-components';
import { FeedbackIcon } from '../../assets/icons/forTest';
import { whiteOpacity } from '../../styles/Mixin';

const Feedback = () => {
  return (
    <FeedbackLink>
      <div>
        <FeedbackIcon />
        <a
          href="https://forms.gle/H9fYGuAomKwzo5ZD6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>피드백</span>
        </a>
      </div>
    </FeedbackLink>
  );
};

const FeedbackLink = styled.a`
  height: 32px;
  z-index: 3;

  position: absolute;
  right: 24px;
  top: 24px;
  background: #7d3cff;
  padding: 4px 12px;
  border-radius: var(--border-radius-checkBtn);

  & div {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
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
