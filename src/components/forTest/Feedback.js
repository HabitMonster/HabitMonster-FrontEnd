import React from 'react';
import styled from 'styled-components';
import { FeedbackIcon } from '../../assets/icons/forTest';
import { whiteOpacity } from '../../styles/Mixin';

const Feedback = () => {
  return (
    <FeedbackLink>
      <div>
        <FeedbackIcon />
        <span>피드백</span>
      </div>
    </FeedbackLink>
  );
};

const FeedbackLink = styled.a`
  width: 87px;
  height: 32px;

  position: absolute;
  right: 24px;
  top: 24px;
  background: #7d3cff;
  padding: 4px 12px;
  border-radius: var(--border-radius-checkBtn);

  & div {
    width: 63px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & span {
    font-size: var(--font-xs);
    font-weight: var(--weight-bold);
    line-height: 17px;
    ${whiteOpacity('0.8')};
  }
`;

export default Feedback;
