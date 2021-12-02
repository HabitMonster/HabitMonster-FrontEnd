import React from 'react';
import styled from 'styled-components';
import { whiteOpacity, setFontStyles, setFlexStyles } from '../../styles';

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
  margin-top: 43px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  })}

  margin-bottom: 32px;

  & h2 {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xl',
      fontWeight: 'regular',
      lineHeight: '32px',
    })}
    margin-bottom: 10px;

    & b {
      ${setFontStyles({ fontWeight: 'bold' })}
    }
  }

  & p {
    ${whiteOpacity('0.8')};
    ${setFontStyles({
      fontSize: 'xs',
      lineHeight: '17px',
    })}
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default NewHabitCategoryHelperText;
