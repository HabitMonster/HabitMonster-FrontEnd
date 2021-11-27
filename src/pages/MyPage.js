import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Gnb } from '../components/gnb';
import { NavButtonHeader } from '../components/common';
import { UserInformation } from '../components/myPage';
import { MonsterCollection } from '../components/achievment';
import { disappearScrollbar } from '../styles/Mixin';

const MyPage = () => {
  const location = useLocation();

  return (
    <>
      <MypageContainer>
        <NavButtonHeader type="myPage" />
        <PageContentWrap
          isCollectionPage={/collection/gi.test(location.pathname)}
        >
          <Switch>
            <Route
              exact
              path="/mypage/information"
              component={UserInformation}
            />
            <Route
              exact
              path="/mypage/collection"
              component={MonsterCollection}
            />
            <Redirect from="*" to="/mypage/information" />
          </Switch>
        </PageContentWrap>
      </MypageContainer>
      <Gnb />
    </>
  );
};

export default MyPage;

const MypageContainer = styled.div`
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  width: 100%;
  height: calc(100% - 80px);
`;

const PageContentWrap = styled.div`
  height: calc(100% - 64px);
  padding-bottom: ${({ isCollectionPage }) =>
    isCollectionPage ? '0' : '64px'};
  overflow-y: auto;
  ${disappearScrollbar()};
`;
