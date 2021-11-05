import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/states';
import styled from 'styled-components';

const Exp = () => {
  const user = useRecoilValue(userState);

  // user.expPercentage: 현재 유저의 경험치 비율을 뜻합니다.
  // 아바타의 현재 경험치 비율을 의미하지 않습니다.

  return (
    <ExpContainer className="expContainer">
      <ExpBar className="expBar">
        <Gauge className="gauge" />
      </ExpBar>
      <Span className="span">Exp</Span>
    </ExpContainer>
  );
};

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 21px;
`;

const ExpBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 315px;
  height: 12px;
  padding: 1px;
  background-color: var(--color-white);
  border-radius: var(--size-border-radius);
`;

const Gauge = styled.div`
  width: 98px;
  height: 8px;
  background-color: var(--color-gauge);
  border-radius: var(--size-border-radius) 0 0 var(--size-border-radius);
  margin: 0 2px;
`;

const Span = styled.span`
  color: var(--color-white);
  width: 20px;
  height: 14px;
  font-family: Apple SD Gothic Neo L;
  font-size: var(--font-nano);
  margin-top: 8px;
  margin-left: 3px;
`;

export default Exp;
