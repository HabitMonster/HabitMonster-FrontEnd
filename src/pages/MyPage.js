import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { fontSize } from '../styles';
import { UserInformation, History } from '../components/myPage';

const MyPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isFirstLogin') === 'true') {
      return history.replace('/monster');
    }
  }, []);

  return (
    <AcheiveContainer>
      <NavButtonWrap>
        <NavButtonItem>
          <NavButton to="/mypage/information" activeClassName="active">
            마이페이지
          </NavButton>
        </NavButtonItem>
        <NavButtonItem>
          <NavButton to="/mypage/history" activeClassName="active">
            히스토리
          </NavButton>
        </NavButtonItem>
      </NavButtonWrap>
      <Switch>
        <Route exact path="/mypage/information" component={UserInformation} />
        <Route exact path="/mypage/history" component={History} />
        <Redirect from="*" to="/mypage/information" />
      </Switch>
    </AcheiveContainer>
  );
};

export default MyPage;

const AcheiveContainer = styled.div`
  /* background-color: var(--color-background); */
  font-family: var(--font-name-apple);
  width: 100%;
`;

const NavButtonWrap = styled.ul`
  background-color: var(--color-background);
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
  color: var(--color-deemed3);
  opacity: var(--opacity-text);
  cursor: pointer;
  ${fontSize('16px')};
  font-weight: var(--weight-bold);
  outline: 0;
  line-height: 19px;
  text-decoration: none;

  &:hover {
    color: var(--color-white);
    border-bottom: 1px solid var(--color-white);
  }

  &.active {
    color: var(--color-white);
    border-bottom: 3px solid var(--color-white);
  }
`;
