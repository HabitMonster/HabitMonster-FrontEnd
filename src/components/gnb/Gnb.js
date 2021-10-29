import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Achevement } from '../../assets/icons/achievement.svg';
import { ReactComponent as New } from '../../assets/icons/add.svg';
import { ReactComponent as My } from '../../assets/icons/my.svg';

const Gnb = () => {
  return (
    <TabBar>
      <Navigation>
        <NavigationItem>
          <NavLink exact to="/">
            <Home />
            <span>홈</span>
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/achievement">
            <Achevement />
            <span>성취</span>
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/new">
            <New />
            <span>작성하기</span>
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/mypage">
            <My />
            <span>마이페이지</span>
          </NavLink>
        </NavigationItem>
      </Navigation>
    </TabBar>
  );
};

const TabBar = styled.nav`
  width: 100%;
  height: 49px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px -0.5px 20px rgba(111, 151, 255, 0.1);
  backdrop-filter: blur(20px);
`;

const Navigation = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & li {
    width: 94px;
  }

  & li:nth-child(2) {
    width: 93px;
  }
`;

const NavigationItem = styled.li`
  height: 49px;
  padding: 11px 0px 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & svg {
      width: 28px;
      height: 28px;
    }

    &.active path {
      fill: #7057fc;
    }

    & span {
      align-self: stretch;
      color: #999999;
      font-size: 10px;
      font-weight: 500;
      line-height: 12px;
      text-align: center;
      letter-spacing: -0.24px;
    }

    &.active span {
      color: #7057fc;
    }
  }
`;

export default Gnb;
