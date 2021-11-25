import React from 'react';
import styled from 'styled-components';
import { MonsterListItemSkeleton } from '../monster';

const skeletons = [...Array(5).keys()].map((key) => ({
  id: key,
}));

const RecommendedUserSectionSkeleton = () => {
  return (
    <Wrapper>
      <h2>추천유저</h2>
      {skeletons.map((skeleton) => (
        <MonsterListItemSkeleton isSearch key={skeleton.id} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  overflow-y: scroll;
  & > h2 {
    color: white;
    padding: 0 24px;
    font-weight: var(--weight-bold);
    line-height: 19.2px;
    margin-top: 32px;
    margin-bottom: 10px;
  }
`;

export default RecommendedUserSectionSkeleton;
