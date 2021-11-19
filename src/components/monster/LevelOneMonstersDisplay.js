import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  babyMonsterState,
  selectedMonsterState,
} from '../../recoil/states/monster';

import { MonsterThumbnail } from '.';
import { BottomFixedButton } from '../common';
import { fontSize } from '../../styles';

//* VERY IMPORTANT NOTE *
// since backend does not supply monsterImage anymore,
// WE MUST AGGREGATE response with our assets.
// To this, WE MUST MODIFY BABYMOSTERSTATE.

const LevelOneMonstersDisplay = ({ go }) => {
  const location = useLocation();
  const monsterList = useRecoilValue(babyMonsterState);
  const setSelectedMonster = useSetRecoilState(selectedMonsterState);
  const [selectedAvatar, setSelectedAvatar] = useState(() => monsterList[0]);

  const handleSelectMonster = () => {
    setSelectedMonster(selectedAvatar);
    go();
  };
  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state);
  }, [location]);
  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <WeightText>반가워요!</WeightText>
          <Title>나만의 몬스터를 골라주세요!</Title>
          <Description>
            한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요.
          </Description>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            imageUrl={selectedAvatar.monsterImage}
            imageAlt={selectedAvatar.monsterImage}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <SelectList>
          {monsterList.map((monster) => {
            return (
              <SelectListItem
                key={monster.monsterId}
                selected={selectedAvatar.monsterImage === monster.monsterImage}
                onClick={() => setSelectedAvatar(monster)}
              >
                <MonsterThumbnail
                  imageUrl={monster.monsterImage}
                  imageAlt={monster.monsterImage}
                />
              </SelectListItem>
            );
          })}
        </SelectList>
      </AvatarWrap>
      <BottomFixedButton
        text="선택하기"
        condition={null}
        onClick={handleSelectMonster}
      />
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

const AvatarWrap = styled.div`
  background-color: var(--color-background);
  width: 100%;
  padding: 75px 24px 100px;
`;

const TitleWrap = styled.div``;

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
  color: var(--color-white);
  ${fontSize('13px')};
  font-weight: var(--weight-regular);
  margin-top: 12px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0 30px;
`;

const SelectList = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SelectListItem = styled.li`
  border: 1px solid
    ${(props) => (props.selected ? 'var(--color-white)' : 'transparent')};
  border-radius: var(--border-radius-small);
  cursor: pointer;
  transition: border 500ms;
`;

export default LevelOneMonstersDisplay;
