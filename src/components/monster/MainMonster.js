import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { monsterState } from '../../recoil/states/monster';

const MainMonster = () => {
  const monster = useRecoilValue(monsterState);

  const isEndWithConsonant = (name) => {
    const finalCharCode = name.charCodeAt(name.length - 1);
    const finalConsonantCode = (finalCharCode - 44032) % 28;
    return finalConsonantCode !== 0;
  };

  const appendPostPosition = (name) => {
    return name + (isEndWithConsonant(name) ? '은' : '는');
  };

  console.log(monster);

  return (
    <>
      <MonsterContainer>
        <TitleWrapper>
          <Title>
            오늘{' '}
            <MonsterName>{appendPostPosition(monster.monsterName)}</MonsterName>
          </Title>
          <Title>얼마나 실천을 했을까요?</Title>
        </TitleWrapper>
        <MonsterImage image={monster.monsterImage} />
      </MonsterContainer>
      <ExpContainer>
        <MonsterLevel>lv.{monster.monsterLevel}</MonsterLevel>
        <ExpWrapper>
          <Exp>
            {monster.monsterExpPoint}
            <Percentage>%</Percentage>
          </Exp>
        </ExpWrapper>
        <GuageBar>
          <Gauge percentage={monster.monsterExpPoint} />
        </GuageBar>
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
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 24px;
  height: 64px;
`;

const Title = styled.p`
  font-family: var(--font-name-apple);
  font-weight: var(--weight-regular);
  font-size: var(--font-xxl);
  line-height: 32px;
  color: var(--color-primary);
`;

const MonsterName = styled.span`
  font-weight: var(--weight-bold);
`;

const MonsterImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 212px;
  margin-bottom: 40px;
  width: 152px;
  height: 152px;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const MonsterLevel = styled.span`
  position: absolute;
  top: 381px;
  left: 24px;
  margin-bottom: 6px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-semi-bold);
  line-height: 17px;
  color: var(--color-primary);
  opacity: 0.8;
`;

const ExpWrapper = styled.div`
  position: absolute;
  top: 351px;
  left: 276px;
  width: 60px;
  height: 53px;
  padding-bottom: 11px;
  box-sizing: box-sizing;
`;

const Exp = styled.p`
  font-family: Apple SD Gothic Neo;
  font-size: var(--font-xxxxl);
  font-weight: var(--weight-regular);
  color: var(--color-primary);
  line-height: 53px;
`;

const Percentage = styled.span`
  font-size: var(--font-xs);
  line-height: 17px;
  margin-left: 4px;
  opacity: 0.8;
`;

const GuageBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 312px;
  height: 6px;
  background-color: rgb(90, 90, 90, 0.6);
  border-radius: 4px;
  box-sizing: border-box;
`;

const Gauge = styled.div`
  width: ${(props) => `${props.percentage}%`};
  height: 6px;
  background-color: var(--color-primary);
  border-radius: 4px;
`;

export default MainMonster;
