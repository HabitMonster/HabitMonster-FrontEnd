import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { whiteOpacity } from '../../styles';

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
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-semi);
  /* margin-bottom: 108px; */
`;
const HelperText = styled.div`
  width: 100%;
  margin-bottom: 34px;
  font-size: var(--font-xs);
  line-height: 21px;
  ${whiteOpacity('0.6')};
  text-align: center;
`;

const AddButton = styled(Link)`
  display: block;
  width: 100%;
  height: 43px;
  padding: 12px 0px;
  text-align: center;
  text-decoration: none;
  background: var(--bg-active);
  color: var(--color-primary);
  font-size: var(--font-xs);
  line-height: 17px;
  font-weight: var(--weight-regular);

  &:active,
  &:visited {
    color: inherit;
    color: var(--color-primary);
  }
`;

export default NoHabitHelper;
