import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  HomeIcon,
  AchievementIcon,
  AddIcon,
  UserIcon,
} from '../../assets/icons/gnb';

import { setFlexStyles } from '../../styles';

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
  height: 80px;
  max-width: 414px;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  background-color: #141517;
  box-shadow: 0px -1px 1px rgba(255, 255, 255, 0.16);
  padding: 12px 29px 24px;
  z-index: 1;
`;

const Navigation = styled.ul`
  width: 100%;
  height: 100%;

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  })}
`;

const NavigationItem = styled.li`
  height: 100%;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;

  & a {
    text-decoration: none;
    ${setFlexStyles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    })}

    &.active path,
    &.active rect,
    &.active circle,
    &.active ellipse {
      stroke: var(--bg-selected-light);
    }
  }
`;

export default Gnb;
