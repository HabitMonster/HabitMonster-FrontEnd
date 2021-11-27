import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Gnb } from '../components/gnb';
import { Statistics, GlobalStatistics } from '../components/achievment';
import { disappearScrollbar } from '../styles/Mixin';

const Achievement = () => {
  return (
    <>
      <AcheiveContainer>
        <NavButtonWrap>
          <NavButtonItem>
            <NavButton to="/achievement/statistics" activeClassName="active">
              월간 통계
            </NavButton>
          </NavButtonItem>
          <NavButtonItem>
            <NavButton to="/achievement/global" activeClassName="active">
              사용자 통계
            </NavButton>
          </NavButtonItem>
        </NavButtonWrap>
        <PageContentWrap>
          <Switch>
            <Route
              exact
              path="/achievement/statistics"
              component={Statistics}
            />
            <Route
              exact
              path="/achievement/global"
              component={GlobalStatistics}
            />
            <Redirect from="*" to="/achievement/statistics" />
          </Switch>
        </PageContentWrap>
      </AcheiveContainer>
      <Gnb />
    </>
  );
};

export default Achievement;

const AcheiveContainer = styled.div`
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
`;

const PageContentWrap = styled.div`
  height: calc(100% - 64px);
  padding-bottom: 64px;
  overflow-y: auto;
  ${disappearScrollbar()};
`;

const NavButtonWrap = styled.ul`
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
  position: relative;
  padding-top: 4px;
`;

const NavButton = styled(NavLink)`
  background-color: transparent;
  border: 0;
  border: 1px solid transparent;
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
