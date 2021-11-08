import React from 'react';
import styled from 'styled-components';

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
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;

  & h2 {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-semi-medium);
    line-height: 32px;
    letter-spacing: 0.374px;
    color: var(--color-white);
    margin-bottom: 8px;

    & b {
      font-weight: var(--font-weight-bold);
    }
  }

  & p {
    color: var(--color-white);
    opacity: 0.8;
    font-size: var(--font-micro);
    line-height: 17px;
    letter-spacing: 0.374px;
  }
`;

export default NewHabitCategoryHelperText;
