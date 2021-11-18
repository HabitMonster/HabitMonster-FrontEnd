import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { MonsterThumbnail } from '../components/monster';
import { BottomFixedButton } from '../components/common';
import { getSelectedMonster } from '../recoil/states/monster';
import { userState } from '../recoil/states/user';
import { appendPostPosition } from '../utils/appendPostPosition';
import { fontSize } from '../styles';

const MonsterGuide = () => {
  const history = useHistory();
  const selectedMonster = useRecoilValue(getSelectedMonster);
  const user = useRecoilValue(userState);

  if (!user.monsterName) {
    history.replace('/monster');
    return;
  }

  return (
    <AvatarContainer>
      <TitleWrap>
        <HeadText>안녕!</HeadText>
        <HeadText>
          <span>
            난 <b>{user.monsterName} </b>{' '}
            {appendPostPosition(user.monsterName) && '이'}
            라고 해.
          </span>
        </HeadText>
      </TitleWrap>
      <ThumbnailWrap>
        <MonsterThumbnail
          imageUrl={selectedMonster.monsterImage}
          imageAlt={selectedMonster.monsterImage}
          imageSize={'large'}
        />
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
        onClick={() => history.replace('/new')}
        condition={null}
      />
    </AvatarContainer>
  );
};

export default MonsterGuide;

const AvatarContainer = styled.div`
  margin-top: 80px;
  font-family: var(--font-name-apple);
  background-color: var(--bg-wrapper);
  width: 100%;
  height: 100%;
  margin-bottom: 108px;
`;

const TextBox = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const TitleWrap = styled.div`
  color: var(--color-white);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 10px;
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
  ${fontSize('15px')};
  color: var(--color-primary);
  font-weight: var(--weight-semi-regular);
  line-height: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  vertical-align: bottom;
  display: flex;
`;

const BigText = styled.p`
  font-weight: var(--weight-semi-bold);
  ${fontSize('20px')};
  line-height: 32px;
  margin: 0 auto;
`;
