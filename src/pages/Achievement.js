import React, { useEffect } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Statistics, Monster } from '../components/achievment';

const Achievement = () => {
  const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem('isFirstLogin') === 'true') {
  //     return history.replace('/monster');
  //   }
  // }, []);

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
`;

const NavButtonWrap = styled.ul`
  border-bottom: 1px solid var(--color-deemed2);
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
  color: var(--color-deemed);
  cursor: pointer;
  font-size: var(--font-micro);
  font-weight: var(--weight-bold);
  outline: 0;
  line-height: 34px;
  text-decoration: none;

  &:hover {
    color: var(--color-main);
    border-bottom: 3px solid var(--color-main);
  }

  &.active {
    color: var(--color-main);
    border-bottom: 3px solid var(--color-main);
  }
`;
