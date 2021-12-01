import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { whiteOpacity, setFontStyles } from '../../styles';

const NoHabitHelper = () => {
  return (
    <Wrapper>
      <HelperText>
        <span>습관이 아직 등록되지 않았어요</span>
        <br />
        <span>오늘의 습관을 추가해주세요!</span>
      </HelperText>
      <AddButton to="/new">습관 추가하기</AddButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--font-name-apple);
  width: 264px;
  margin: 0 auto;
  border-radius: var(--border-radius-semi);
`;

const HelperText = styled.div`
  width: 100%;
  ${setFontStyles({
    fontSize: 'xs',
    lineHeight: '21px',
  })}
  ${whiteOpacity('0.6')};
  text-align: center;
`;

const AddButton = styled(Link)`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: '17px',
  })}
  width: 100%;
  height: 40px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: var(--bg-active);
  border-radius: 4px;

  &:active,
  &:visited {
    color: inherit;
    color: var(--color-primary);
  }
`;

export default NoHabitHelper;
