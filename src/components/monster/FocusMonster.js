import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { MonsterThumbnail } from '../components/monster';

const FocusMonster = () => {
  return (
    <AvatarContainer>
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
    </AvatarContainer>
  );
};

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
