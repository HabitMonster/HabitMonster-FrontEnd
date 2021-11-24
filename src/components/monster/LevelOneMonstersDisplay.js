import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import {
  babyMonsterState,
  selectedMonsterState,
} from '../../recoil/states/monster';

import {
  BottomFixedButton,
  MonsterThumbnail,
  BackButtonHeader,
} from '../common';
import { whiteOpacity } from '../../styles/Mixin';

const LevelOneMonstersDisplay = ({ go }) => {
  const location = useLocation();
  const monsterList = useRecoilValue(babyMonsterState);
  const enabledMonsterList = monsterList.filter(({ enable }) => enable);
  const [selectedAvatar, setSelectedAvatar] = useState(
    () => enabledMonsterList[0],
  );

  const setSelectedMonster = useSetRecoilState(selectedMonsterState);
  const excludeMonsterId = location?.state?.levelOneId ?? -1;

  const handleSelectMonster = (monster) => {
    setSelectedAvatar(monster);
  };

  useEffect(() => {
    /*
      https://github.com/facebookexperimental/Recoil/issues/1076
      리코일에서의 setState는 리액트에서의 setState와 싱크를 맞출 수 없기 때문에
      리렌더링이 일어날 때 마다 useEffect으로 싱크를 맞춰줍니다.
      해당 동기화는 리액트 실험 버전의 훅인 useTransaction()으로 맞출 수 있으나
      보장을 하지 못하기 때문에 이 방법을 선택합니다.
    */
    setSelectedMonster(selectedAvatar);
  }, [selectedAvatar, setSelectedMonster]);

  return (
    <AvatarContainer>
      <AvatarWrap>
        {Boolean(location.state) && (
          <BackbuttonWrapper>
            <BackButtonHeader onButtonClick={() => {}} />
          </BackbuttonWrapper>
        )}
        <TitleWrap selectAgainMode={Boolean(location.state)}>
          <WeightText>반가워요!</WeightText>
          <Title>나만의 몬스터를 골라주세요!</Title>
          <Description>
            한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요.
          </Description>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            id={selectedAvatar.monsterId}
            width="124px"
            height="124px"
          />
        </ThumbnailWrap>
        <SelectList>
          {monsterList.map((monster) => {
            return (
              excludeMonsterId !== monster.monsterId && (
                <SelectListItem
                  key={monster.monsterId}
                  selected={
                    selectedAvatar.monsterImage === monster.monsterImage
                  }
                  onClick={() => handleSelectMonster(monster)}
                >
                  <MonsterThumbnail
                    id={monster.monsterId}
                    width="32px"
                    height="32px"
                  />
                </SelectListItem>
              )
            );
          })}
        </SelectList>
      </AvatarWrap>
      <BottomFixedButton text="선택하기" condition={null} onClick={go} />
    </AvatarContainer>
  );
};

LevelOneMonstersDisplay.propTypes = {
  go: PropTypes.func.isRequired,
};

const AvatarContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
`;

const BackbuttonWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
`;

const AvatarWrap = styled.div`
  background-color: var(--color-background);
  width: 100%;
  padding: 0 24px;
`;

const TitleWrap = styled.div`
  margin-top: ${({ selectAgainMode }) => (selectAgainMode ? '0px' : '80px')};
`;

const Title = styled.h2`
  color: var(--color-white);
  font-size: var(--font-xxl);
  font-weight: var(--weight-bold);
  line-height: 32px;
`;

const WeightText = styled.span`
  color: var(--color-white);
  font-size: var(--font-xxl);
  font-weight: var(--weight-regular);
  line-height: 32px;
`;

const Description = styled.p`
  ${whiteOpacity('0.7')};
  font-size: 13px;
  font-weight: var(--weight-regular);
  margin-top: 12px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 200px;
  height: 200px;
`;

const SelectList = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const SelectListItem = styled.li`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${(props) => (props.selected ? 'var(--color-white)' : 'transparent')};
  border-radius: var(--border-radius-small);
  cursor: pointer;
  transition: border 500ms;
`;

export default LevelOneMonstersDisplay;
