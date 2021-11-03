import React from 'react';
import styled from 'styled-components';

const CategoryHelperText = () => {
  return (
    <Wrapper>
      <h2>
        어떤 <b>습관</b>을 가지고 싶어?
      </h2>
      <p>카테고리를 클릭해서 습관을 작성해주세요🙌</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 71px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;

  & h2 {
    font-weight: var(--weight-extra-bold);
    font-size: var(--font-semi-medium);
    line-height: 29px;
    letter-spacing: 0.374px;
    color: var(--color-title);
    margin-bottom: 8px;

    & b {
      color: var(--color-purple);
    }
  }

  & p {
    color: #868686;
    font-weight: var(--weight-regular);
    font-size: var(--font-micro);
    line-height: 17px;
    letter-spacing: 0.374px;
  }
`;

export default CategoryHelperText;
