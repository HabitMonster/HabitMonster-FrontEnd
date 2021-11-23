import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { BottomFixedButton, MonsterThumbnail } from '../common';
import { monsterState } from '../../recoil/states/monster';
import { authState } from '../../recoil/states/auth';
import { appendPostPosition } from '../../utils/appendPostPosition';

const MonsterGuide = () => {
  const history = useHistory();
  const monster = useRecoilValue(monsterState);
  const [auth, setAuth] = useRecoilState(authState);

  const handleButtonClick = () => {
    setAuth({ ...auth, isFirstLogin: false });
    setTimeout(() => {
      history.replace('/new');
    }, 0);
  };

  return (
    <AvatarContainer>
      <TitleWrap>
        <HeadText>안녕!</HeadText>
        <HeadText>
          <span>
            난 <b>{monster.monsterName} </b>{' '}
            {appendPostPosition(monster.monsterName) && '이'}
            라고 해.
          </span>
        </HeadText>
      </TitleWrap>
      <ThumbnailWrap>
        <MonsterThumbnail width="177px" height="177px" id={monster.monsterId} />
      </ThumbnailWrap>
      <TitleWrap>
        <TextBox>
          <SmallText>나는 레벨 5까지 있어! </SmallText>
          <BigText>네가 습관을 실천할 수록 나는 성장해!</BigText>
        </TextBox>
        <TextBox>
          <SmallText>내가 성장하면서 너가 상상하지 못한 </SmallText>
          <BigText>새로운 모습으로 변화될거야</BigText>
        </TextBox>
        <TextBox>
          <SmallText>점점 성장하는 모습 기대되지 않니?</SmallText>
          <BigText>나와 함께 습관을 만들러 가자!</BigText>
        </TextBox>
      </TitleWrap>
      <BottomFixedButton
        text="습관 작성하러 가기"
        onClick={handleButtonClick}
        condition={null}
      />
    </AvatarContainer>
  );
};

export default MonsterGuide;

const AvatarContainer = styled.div`
  font-family: var(--font-name-apple);
  background-color: var(--bg-wrapper);
  width: 100%;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 128px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ThumbnailWrap = styled.div`
  width: 284px;
  height: 284px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px auto;
`;

const TextBox = styled.div`
  text-align: center;
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const TitleWrap = styled.div`
  color: var(--color-white);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
`;

const HeadText = styled.p`
  font-size: var(--font-xxl);
  font-weight: var(--weight-regular);
  line-height: 32px;
  margin-left: 24px;

  & > span {
    vertical-align: text-bottom;
  }

  & > span > b {
    text-decoration: underline;
    font-weight: var(--weight-bold);
    display: inline-block;
  }
`;

const SmallText = styled.p`
  font-size: var(--font-s);
  color: var(--color-primary);
  font-weight: var(--weight-semi-regular);
  line-height: 32px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  vertical-align: bottom;
  display: flex;
`;

const BigText = styled.p`
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-xl);
  line-height: 32px;
  margin: 0 auto;
`;
