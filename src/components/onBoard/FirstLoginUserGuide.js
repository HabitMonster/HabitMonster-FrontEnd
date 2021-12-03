import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { defaultAuthSelector } from '../../recoil/states/auth';
import { monsterState } from '../../recoil/states/monster';

import { BottomFixedButton, MonsterThumbnail } from '../common';

import { disappearScrollbar, setFlexStyles, setFontStyles } from '../../styles';

import { appendPostPosition } from '../../utils/appendPostPosition';

const MonsterGuide = () => {
  const history = useHistory();
  const refreshAuth = useRecoilRefresher_UNSTABLE(defaultAuthSelector);
  const monster = useRecoilValue(monsterState);

  const handleButtonClick = () => {
    refreshAuth();
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

const AvatarContainer = styled.div`
  font-family: var(--font-name-apple);
  background-color: var(--bg-wrapper);
  width: 100%;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 128px;
  overflow-y: auto;
  ${disappearScrollbar()};
`;

const ThumbnailWrap = styled.div`
  width: 284px;
  height: 284px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
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
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })}
`;

const HeadText = styled.p`
  ${setFontStyles({
    fontSize: 'xxl',
    fontWeight: 'regular',
    lineHeight: '32px',
  })}
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
  ${setFontStyles({
    color: 'primary',
    fontSize: 's',
    fontWeight: 'semi-regular',
    lineHeight: '32px',
  })}
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  })}
  text-align: center;
  vertical-align: bottom;
`;

const BigText = styled.p`
  ${setFontStyles({
    fontSize: 'xl',
    fontWeight: 'semi-bold',
    lineHeight: '32px',
  })}
  margin: 0 auto;
`;

export default MonsterGuide;
