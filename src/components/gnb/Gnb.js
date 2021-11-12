import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  HomeIcon,
  AchievementIcon,
  AddIcon,
  UserIcon,
} from '../../assets/icons/gnb';

const Gnb = () => {
  return (
    <TabBar>
      <Navigation>
        <NavigationItem>
          <NavLink exact to="/">
            <HomeIcon />
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/achievement">
            <AchievementIcon />
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/new">
            <AddIcon />
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/mypage">
            <UserIcon />
          </NavLink>
        </NavigationItem>
      </Navigation>
    </TabBar>
  );
};

const TabBar = styled.nav`
  width: 100%;
  height: 56px;
  max-width: 360px;
  position: fixed;
  bottom: 0;
  background-color: var(--bg-wrapper);
  padding: 12px 29px;
  z-index: 1;
`;

const Navigation = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavigationItem = styled.li`
  height: 100%;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;

  & a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.active path {
      fill: var(--bg-selected-light);
    }
  }
`;

export default Gnb;
