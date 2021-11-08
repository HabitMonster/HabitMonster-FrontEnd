import React, { useState } from 'react';
import styled from 'styled-components';

import { AvatarThumbnail } from '../components/avatar';
import { avatarApis } from '../api/index';

import {
  babyMonOrange,
  babyMonBlue,
  babyMonGreen,
  babyMonPurple,
  babyMonYellow,
} from '../assets/images/monsters';

const AVATAR_MOCK_LIST = [
  {
    imageUrl: babyMonOrange,
    imageAlt: '주황이',
    monsterId: 1,
  },
  {
    imageUrl: babyMonBlue,
    imageAlt: '파랑이',
    monsterId: 'Lv1-blue',
  },
  {
    imageUrl: babyMonGreen,
    imageAlt: '녹색이',
    monsterId: 'Lv1-green',
  },
  {
    imageUrl: babyMonPurple,
    imageAlt: '보랑이',
    monsterId: 'Lv1-purple',
  },
  {
    imageUrl: babyMonYellow,
    imageAlt: '노랑이',
    monsterId: 'Lv1-yellow',
  },
];

const Avatar = () => {
  const [avatarName, setAvatarName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_MOCK_LIST[0]);

  const selectAvatar = (avatar) => {
    console.log('selectedAvatar.monsterId', selectedAvatar.monsterId);
    setSelectedAvatar(avatar);
  };

  const changeAvatarName = (event) => {
    setAvatarName(event.target.value);
  };

  const setMonsterInfo = async () => {
    const avatarInfo = {
      monsterId: selectedAvatar.monsterId,
      monsterName: avatarName,
    };

    try {
      console.log('avatarInfo', avatarInfo);
      const { data } = await avatarApis.setAvatar(avatarInfo);
      if (data.statusCode === OK) {
        history.push('/main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <Title>
            반가워요 🙌 <br />
            <ColorText>나만의 몬스터</ColorText>를 골라주세요!
          </Title>
          <Description>
            한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요
          </Description>
        </TitleWrap>
        <ThumbnailWrap>
          <AvatarThumbnail
            imageUrl={selectedAvatar.imageUrl}
            imageAlt={selectedAvatar.imageAlt}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <SelectList>
          {AVATAR_MOCK_LIST.map((avatar) => {
            return (
              <SelectListItem
                key={avatar.imageUrl}
                selected={selectedAvatar.imageUrl === avatar.imageUrl}
                onClick={() => selectAvatar(avatar)}
              >
                <AvatarThumbnail
                  imageUrl={avatar.imageUrl}
                  imageAlt={avatar.imageAlt}
                  imageSize={'small'}
                />
              </SelectListItem>
            );
          })}
        </SelectList>
        <InputWrap>
          <NameInput
            type="text"
            value={avatarName}
            onChange={changeAvatarName}
            placeholder="너의 몬스터 이름은?"
          />
        </InputWrap>
      </AvatarWrap>
      <FixedButton onClick={setMonsterInfo}>Start</FixedButton>
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  font-family: var(--font-name-apple);
  width: 100%;
  height: 100%;
`;

const AvatarWrap = styled.div`
  background-color: var(--color-login-bg);
  padding: 6% 24px 10%;
  width: 100%;
  padding: 70px 24px 100px;
`;

const TitleWrap = styled.div``;

const Title = styled.h2`
  color: var(--color-white);
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-extra-bold);
  line-height: 29px;
`;

const ColorText = styled.span`
  color: var(--color-yellow);
`;

const Description = styled.p`
  color: var(--color-white);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  margin-top: 12px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0 30px;
`;

const SelectList = styled.ul`
  display: grid;
  gap: 6px;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  max-width: 204px;
`;

const SelectListItem = styled.li`
  border: 3px solid
    ${(props) => (props.selected ? 'var(--color-white)' : 'rgba(0, 0, 0, 0.4)')};
  border-radius: var(--border-radius-avatarItem);
  cursor: pointer;
  transition: border 500ms;
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
  background-color: var(--color-main);
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
  height: 68px;
  width: 100%;
  max-width: 375px;
`;
