import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { monsterState } from '../../recoil/states/monster';

const MainMonster = () => {
  const monster = useRecoilValue(monsterState);

  return (
    <>
      <MonsterContainer>
        <MonsterImage image={monster.monsterImage} />
        <MonsterInfo>
          <MonsterName>{monster.monsterName}</MonsterName>
          <MonsterLevel>lv.{monster.level}</MonsterLevel>
        </MonsterInfo>
      </MonsterContainer>
      <ExpContainer>
        <ExpBar>
          <Gauge percentage={monster.monsterExpPoint} />
        </ExpBar>
        <Span>Exp</Span>
      </ExpContainer>
    </>
  );
};

const MonsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-bottom: 57px;
`;

const MonsterImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 148px;
  height: 122.94px;
  margin-top: 108px;
  background-image: ${(props) => `url(${props.image})`};
`;

const MonsterInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 79px;
  color: var(--color-white);
`;

const MonsterName = styled.span`
  margin-right: 6px;
  font-family: var(--font-name-apple);
  font-size: var(--font-regular);
  font-weight: var(--weight-bold);
`;

const MonsterLevel = styled.span`
  font-family: var(--font-name-apple);
  font-size: var(--font-micro);
  font-size: var(--weight-regular);
`;

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
  box-sizing: border-box;
`;

const Gauge = styled.div`
  width: ${(props) => `${props.percentage}%`};
  height: 8px;
  background-color: var(--color-main);
  border-radius: var(--size-border-radius);
  margin: 1px;
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

export default MainMonster;
