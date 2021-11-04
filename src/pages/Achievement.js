import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Statistics, Monster } from '../components/achievment';

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
        <Route exact path="/achievement/monster" component={Monster} />
        <Redirect from="*" to="/achievement/statistics" />
      </Switch>
    </AcheiveContainer>
  );
};

export default Achievement;

const AcheiveContainer = styled.div`
  font-family: var(--font-name-apple);
  width: 100%;
  /* margin: 0 auto; */
`;

const NavButtonWrap = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
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
  color: #999999;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  outline: 0;
  line-height: 34px;
  text-decoration: none;

  &:hover {
    color: #7057fc;
    border-bottom: 3px solid #7057fc;
  }

  &.active {
    color: #7057fc;
    border-bottom: 3px solid #7057fc;
  }
`;
