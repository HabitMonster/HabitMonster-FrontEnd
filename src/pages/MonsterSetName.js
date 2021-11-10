import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { MonsterThumbnail } from '../components/monster';
import { monsterApis } from '../api';
import { getSelectedMonster } from '../recoil/states/monster';

import { OK } from '../constants/statusCode';

const MonsterSetName = () => {
  const history = useHistory();
  const selectedMonster = useRecoilValue(getSelectedMonster);
  console.log('selectedMonster', selectedMonster);
  const [monsterName, setMonsterName] = useState('');

  const changeMonsterName = (event) => {
    setMonsterName(event.target.value);
  };

  const setMonsterInfo = async () => {
    const monsterInfo = {
      monsterId: selectedMonster.monsterId,
      monsterName: monsterName,
    };

    try {
      console.log('monsterInfo', monsterInfo);
      const { data } = await monsterApis.setMonster(monsterInfo);
      if (data.statusCode === OK) {
        history.push('/guide');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedMonster) {
    return <Title>선택한 몬스터가 없습니다!</Title>;
  }

  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <Title>몬스터를 뭐라고 부를까요?</Title>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            imageUrl={selectedMonster.monsterImage}
            imageAlt={selectedMonster.monsterImage}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <InputWrap>
          <NameInput
            type="text"
            value={monsterName}
            onChange={changeMonsterName}
            placeholder="이름을 입력해 주세요"
            required
          />
        </InputWrap>
      </AvatarWrap>
      <FixedButton onClick={setMonsterInfo}>시작하기</FixedButton>
    </AvatarContainer>
  );
};

export default MonsterSetName;

const AvatarContainer = styled.div`
  background-color: var(--color-background);
  font-family: var(--font-name-apple);
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
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-bold);
  line-height: 32px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0 30px;
`;

const InputWrap = styled.div`
  border: 2px solid var(--color-white);
  border-radius: var(--border-radius-mideum);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 277px;
  height: 46px;
  margin: 50px auto;
`;

const NameInput = styled.input`
  border: 0;
  background: none;
  color: var(--color-white);
  font-size: var(--font-regular);
  font-weight: bold;
  line-height: 22px;
  outline: 0;
  text-align: center;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const FixedButton = styled.button`
  background-color: #4d0dcd;
  border: 0;
  outline: 0;
  color: var(--color-white);
  font-size: var(--font-regular);
  font-weight: var(--weight-bold);
  line-height: 22px;
  text-align: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 64px;
  width: 100%;
  max-width: 480px;
`;
