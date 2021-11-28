import React, { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import {
  RecommendedUserSection,
  RecommendedUserSectionSkeleton,
  UserSearchSection,
} from '../components/search';

import { disappearScrollbar } from '../styles/Mixin';

const Search = () => {
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
  position: ${isMobile ? 'fixed' : 'relative'};
  ${isMobile && `top: 0;left: 0;right: 0;bottom: 0;`};
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default Search;
