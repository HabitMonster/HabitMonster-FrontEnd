import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ACTIVE_CLASS_NAME,
  MY_PAGE_NAV_BUTTON_LIST,
  ACHIEVEMENT_NAV_BUTTON_LIST,
} from '../../constants/common';

import { setFontStyles, setFlexStyles } from '../../styles';

const NavButtonHeader = ({ type }) => {
  const [navButtonList, setNavButtonList] = useState([]);

  useEffect(() => {
    switch (type) {
      case 'myPage':
        setNavButtonList(MY_PAGE_NAV_BUTTON_LIST);
        break;
      case 'achievement':
        setNavButtonList(ACHIEVEMENT_NAV_BUTTON_LIST);
        break;
      default:
        break;
    }

    return () => setNavButtonList([]);
  }, [type]);

  if (!navButtonList?.length) {
    return null;
  }

  return (
    <NavButtonWrap>
      {navButtonList.map((navItem) => {
        return (
          <NavButtonItem key={navItem.title}>
            <NavButton to={navItem.link} activeClassName={ACTIVE_CLASS_NAME}>
              {navItem.title}
            </NavButton>
          </NavButtonItem>
        );
      })}
    </NavButtonWrap>
  );
};

export default NavButtonHeader;

const NavButtonWrap = styled.ul`
  background-color: var(--color-background);
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  list-style: none;
  margin: 0;
  padding-top: 24px;
`;

const NavButtonItem = styled.li`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'm',
  })}
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'center',
  })}
  list-style: none;
  width: 50%;
  height: 40px;
  position: relative;
  padding-top: 4px;
`;

const NavButton = styled(NavLink)`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'm',
    fontWeight: 'semi-regular',
    lineHeight: '19px',
  })}
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  outline: 0;
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

NavButtonHeader.propTypes = {
  type: PropTypes.string.isRequired,
};
