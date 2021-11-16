import React from 'react';
import styled from 'styled-components';
import { whiteOpacity } from '../../styles/Mixin';

const NewHabitCategoryHelperText = () => {
  return (
    <Wrapper>
      <h2>
        어떤 종류의 <b>습관</b>을 만들까요?
      </h2>
      <p>카테고리를 클릭해서 습관을 작성해주세요🙌</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* margin-top: 80px; */
  margin-top: 43px; //현재 640기준아님. 640 + 37 = 677기준.
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;

  & h2 {
    font-weight: var(--weight-regular);
    font-size: var(--font-xl);
    line-height: 32px;
    letter-spacing: 0.374px;
    color: var(--color-primary);
    margin-bottom: 10px;

    & b {
      font-weight: var(--weight-bold);
    }
  }

  & p {
    ${whiteOpacity('0.8')};
    font-size: var(--font-xs);
    line-height: 17px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default NewHabitCategoryHelperText;
