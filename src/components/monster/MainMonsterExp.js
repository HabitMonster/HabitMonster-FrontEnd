import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { userState } from '../../recoil/states/user';

const MainMonsterExp = () => {
  const user = useRecoilValue(userState);

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
  background-color: var(--color-main);
  border-radius: var(--size-border-radius) 0 0 var(--size-border-radius);
  margin: 0 2px;
`;

const Span = styled.span`
  color: var(--color-white);
  width: 20px;
  height: 14px;
  font-family: var(--font-name-apple);
  font-size: var(--font-nano);
  font-weight: var(--weight-regular);
  margin-top: 8px;
  margin-left: 3px;
`;

export default MainMonsterExp;
