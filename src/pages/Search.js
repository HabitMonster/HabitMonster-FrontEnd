import React, { Suspense } from 'react';
import styled from 'styled-components';

import {
  RecommendedUserSection,
  RecommendedUserSectionSkeleton,
  UserSearchSection,
} from '../components/search';

import { disappearScrollbar } from '../styles/Mixin';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const history = useHistory();
  console.log(history);
  return (
    <Wrapper>
      <UserSearchSection />
      <Suspense fallback={<RecommendedUserSectionSkeleton />}>
        <RecommendedUserSection />
      </Suspense>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;

  ${disappearScrollbar()};
`;

export default Search;
