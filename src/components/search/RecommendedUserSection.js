import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { recommendedUserSelector } from '../../recoil/states/search';

import { MonsterListItem } from '../monster';

import { disappearScrollbar } from '../../styles';

const RecommendedUserSection = () => {
  const recommendedUserList = useRecoilValue(recommendedUserSelector);
  const { path } = useRouteMatch();

  return (
    <Wrapper>
      <h2>추천유저</h2>
      {recommendedUserList.map(
        ({ isFollowed, monsterCode, monsterId, nickName, title }) => {
          return (
            <MonsterListItem
              key={title + nickName + monsterId}
              nickName={nickName}
              monsterId={monsterId}
              monsterCode={monsterCode}
              recommendationTitle={title}
              isFollowed={isFollowed}
              path={`${path}/${monsterCode}`}
            />
          );
        },
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  overflow-y: scroll;
  ${disappearScrollbar()};
  & > h2 {
    color: white;
    padding: 0 24px;
    font-weight: var(--weight-bold);
    line-height: 19.2px;
    margin-top: 32px;
    margin-bottom: 10px;
  }
`;

export default RecommendedUserSection;
