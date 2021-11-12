import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { MonsterThumbnail } from '../components/monster';
import { BottomFixedButton } from '../components/common';
import { TextInput } from '../components/common';
import { monsterApis } from '../api';
import { getSelectedMonster, monsterNameState } from '../recoil/states/monster';

import { OK } from '../constants/statusCode';

const MonsterSetting = () => {
  const history = useHistory();
  const selectedMonster = useRecoilValue(getSelectedMonster);
  const [monsterName, setMonsterName] = useRecoilState(monsterNameState);

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
        <TextInput
          text={monsterName}
          placeholder="이름을 입력해 주세요"
          onTextChanged={setMonsterName}
          maxLength={10}
          idleHelperText="한글, 영문, 숫자 공백없이 최대 10자 입력 가능해요"
          errorMessage="최대 글자 수를 초과했어요"
          lengthValidationMode={true}
        />
      </AvatarWrap>
      <FixedButton onClick={setMonsterInfo}>시작하기</FixedButton>
      {/* <BottomFixedButton text="시작하기" onClick={setMonsterInfo} /> */}
    </AvatarContainer>
  );
};

export default MonsterSetting;

const AvatarContainer = styled.div`
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  width: 100%;
  height: calc(100% - 64px);
`;

const AvatarWrap = styled.div`
  background-color: var(--bg-wrapper);
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
  cursor: pointer;
`;
