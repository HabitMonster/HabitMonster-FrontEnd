import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { monsterState } from '../../recoil/states/monster';
import { whiteOpacity } from '../../styles';
import { appendPostPosition } from '../../utils/appendPostPosition';

const MainMonster = ({ heightShrinked }) => {
  const monster = useRecoilValue(monsterState);

  return (
    <MonsterContainer>
      <TitleWrapper heightShrinked={heightShrinked}>
        <Title>
          오늘{' '}
          <span>
            {appendPostPosition(monster.monsterName)
              ? `${monster.monsterName}은`
              : `${monster.monsterName}는`}
          </span>
        </Title>
        <Title>얼마나 실천을 했을까요?</Title>
      </TitleWrapper>
      <MonsterImage
        heightShrinked={heightShrinked}
        image={monster.monsterImage}
      />
      <ExpContainer>
        <ExpText>
          <MonsterLevel>lv.{monster.monsterLevel}</MonsterLevel>
          <Exp>
            {monster.monsterExpPoint}
            <span>%</span>
          </Exp>
        </ExpText>
        <GuageBar>
          <Gauge percentage={monster.monsterExpPoint} />
        </GuageBar>
      </ExpContainer>
    </MonsterContainer>
  );
};

MainMonster.propTypes = {
  heightShrinked: PropTypes.bool,
};

const MonsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background: #1e135c;
  padding: 24px;
  transition: all 150ms ease-in;
`;

const TitleWrapper = styled.div`
  display: block;
  margin-top: ${({ heightShrinked }) => (!heightShrinked ? '56px' : '0px')};
  height: ${({ heightShrinked }) => (!heightShrinked ? '64px' : '0px')};
  opacity: ${({ heightShrinked }) => (!heightShrinked ? '1' : '0')};
  transition: all 350ms linear;
`;

const Title = styled.p`
  font-family: var(--font-name-apple);
  font-weight: var(--weight-regular);
  font-size: var(--font-xxl);
  line-height: 32px;
  color: var(--color-primary);

  & span {
    font-weight: var(--weight-bold);
  }
`;

const MonsterImage = styled.div`
  width: 128px;
  height: 128px;
  margin: auto;
  // 아래 항목 주석처리 한 이유: 뷰가 640 기준으로 안나왔기 때문
  margin-top: ${({ heightShrinked }) => (!heightShrinked ? '68px' : '0px')};
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: all 350ms linear;
`;

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6px;
`;

const MonsterLevel = styled.span`
  margin-bottom: 6px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-semi-bold);
  line-height: 17px;
  ${whiteOpacity('0.8')};
`;

const Exp = styled.p`
  font-family: Apple SD Gothic Neo;
  font-size: var(--font-xxxxl);
  font-weight: var(--weight-regular);
  color: var(--color-primary);
  line-height: 53px;

  & span {
    font-size: var(--font-xs);
    line-height: 17px;
    margin-left: 4px;
    opacity: 0.8;
  }
`;

const GuageBar = styled.div`
  height: 6px;
  background-color: rgb(90, 90, 90, 0.6);
  border-radius: var(--border-radius-semi);
`;

const Gauge = styled.div`
  width: ${(props) => `${props.percentage}%`};
  height: 6px;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-semi);
`;

export default MainMonster;
