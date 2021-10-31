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
  margin: 12px 0px;
  margin-top: 24px;
  margin-bottom: 60px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & h2 {
    font-weight: 800;
    font-size: var(--font-semi-medium);
    line-height: 29px;
    letter-spacing: 0.374px;
    color: #333333;
    margin-bottom: 12px;

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
