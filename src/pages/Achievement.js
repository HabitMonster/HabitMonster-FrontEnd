import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Statistics, MonsterCollection } from '../components/achievment';

const Achievement = () => {
  return (
    <AcheiveContainer>
      <NavButtonWrap>
        <NavButtonItem>
          <NavButton to="/achievement/statistics" activeClassName="active">
            월간 통계
          </NavButton>
        </NavButtonItem>
        <NavButtonItem>
          <NavButton to="/achievement/monster" activeClassName="active">
            몬스터 도감
          </NavButton>
        </NavButtonItem>
      </NavButtonWrap>
      <Switch>
        <Route exact path="/achievement/statistics" component={Statistics} />
        <Route
          exact
          path="/achievement/monster"
          component={MonsterCollection}
        />
        <Redirect from="*" to="/achievement/statistics" />
      </Switch>
    </AcheiveContainer>
  );
};

export default Achievement;

const AcheiveContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
  flex: 1 1 0;
`;

const NavButtonWrap = styled.ul`
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  list-style: none;
  margin: 0;
  padding-top: 52px;
`;

const NavButtonItem = styled.li`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 50%;
  height: 34px;
  position: relative;
`;

const NavButton = styled(NavLink)`
  background-color: transparent;
  border: 0;
  border: 1px solid transparent;
  color: rgba(248, 248, 248, 0.6);
  cursor: pointer;
  font-size: var(--font-micro);
  font-weight: var(--weight-bold);
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
