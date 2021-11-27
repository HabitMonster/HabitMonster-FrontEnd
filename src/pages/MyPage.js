import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

import { Gnb } from '../components/gnb';
import { UserInformation } from '../components/myPage';
import { MonsterCollection } from '../components/achievment';
import { disappearScrollbar } from '../styles/Mixin';

const MyPage = () => {
  const location = useLocation();

  console.log('location', location);
  return (
    <>
      <MypageContainer>
        <NavButtonWrap>
          <NavButtonItem>
            <NavButton to="/mypage/information" activeClassName="active">
              마이페이지
            </NavButton>
          </NavButtonItem>
          <NavButtonItem>
            <NavButton to="/mypage/collection" activeClassName="active">
              몬스터 도감
            </NavButton>
          </NavButtonItem>
        </NavButtonWrap>
        <PageContentWrap>
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
  padding-bottom: 64px;
  overflow-y: auto;
  ${disappearScrollbar()};
`;

const NavButtonWrap = styled.ul`
  background-color: var(--color-background);
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  list-style: none;
  margin: 0;
  padding-top: 24px;
`;

const NavButtonItem = styled.li`
  color: var(--color-primary-deemed);
  display: flex;
  justify-content: center;
  list-style: none;
  width: 50%;
  height: 40px;
  font-size: var(--font-m);
  position: relative;
  padding-top: 4px;
`;

const NavButton = styled(NavLink)`
  background-color: transparent;
  border: 0;
  border: 1px solid transparent;
  /* color: var(--color-deemed3); */
  color: rgba(248, 248, 248, 0.6);
  cursor: pointer;
  font-size: var(--font-m);
  font-weight: var(--weight-semi-regular);
  outline: 0;
  line-height: 19px;
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }

  &.active {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
`;
