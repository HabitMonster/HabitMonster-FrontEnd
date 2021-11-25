import React, { Suspense } from 'react';
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
  position: relative;
  overflow-y: scroll;

  ${disappearScrollbar()};
`;
const BackButtonWrapper = styled.div`
  margin: 24px 0;
  position: relative;
`;

const CancelButton = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  & > div {
    width: 18px;
    height: 18px;
    background: #999999;
    border-radius: 99em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 7.66px;
      height: 2.12px;
      background: var(--bg-primary);
      border-radius: 99em;
      position: absolute;

      &:first-child {
        transform: rotate(45deg);
      }
      &:last-child {
        transform: rotate(135deg);
      }
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 14px 12px;
  background: var(--bg-primary);
  border: none;
  border-radius: 4px;
  color: var(--color-deemed);

  &::placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: var(--weight-regular);
    color: var(--color-deemed);
  }

  &:focus {
    outline: none;
  }
`;

const SearchFailSection = styled.div`
  height: 145px;
  margin-top: 48px;
  position: relative;
`;

const RecommendationSection = styled.ul`
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

export default Search;
