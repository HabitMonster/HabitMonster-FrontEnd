import React, { useState } from 'react';
import styled from 'styled-components';

import { AvatarThumbnail } from '../components/avatar';
import { monsterApis } from '../api/index';
import { fontSize } from '../styles';

const MonsterSetting = () => {
  const [avatarName, setAvatarName] = useState('');

  const changeAvatarName = (event) => {
    setAvatarName(event.target.value);
  };

  const setMonsterInfo = async () => {
    const monsterInfo = {
      monsterId: selectedAvatar.monsterId,
      monsterName: avatarName,
    };

    try {
      console.log('monsterInfo', monsterInfo);
      const { data } = await monsterApis.setMonster(monsterInfo);
      if (data.statusCode === OK) {
        history.push('/main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AvatarContainer>
      <TitleWrap>
        <Title>몬스터를 뭐라고 부를까요?</Title>
      </TitleWrap>
      <ThumbnailWrap>
        <AvatarThumbnail
          imageUrl={selectedAvatar.imageUrl}
          imageAlt={selectedAvatar.imageAlt}
          imageSize={'large'}
        />
      </ThumbnailWrap>
      <InputWrap>
        <NameInput
          type="text"
          value={avatarName}
          onChange={changeAvatarName}
          placeholder="20자 이내로 적어주세요"
        />
      </InputWrap>
      <FixedButton
        onClick={() => {
          window.location.href = '/select';
        }}
      >
        시작하기
      </FixedButton>
    </AvatarContainer>
  );
};
export default MonsterSetting;

const AvatarContainer = styled.div`
  font-family: var(--font-name-apple);
  width: 100%;
  height: 100%;
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
  /* background-color: var(--color-main); */
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
  max-width: 375px;
`;
