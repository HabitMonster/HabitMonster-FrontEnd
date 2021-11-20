import React, { useRef, useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import HabitDetail from '../pages/HabitDetail';
import HabitEdit from '../pages/HabitEdit';

import OnBoard from './onBoard/OnBoard';
import Notice from './myPage/Notice';
import Follow from '../pages/Follow';
import Search from '../pages/Search';
import SearchDetail from '../pages/SearchDetail';
import Select from '../pages/Select';
import SearchDetailHabit from '../pages/SearchDetailHabit';

function App() {
  const r = useRef(1);
  console.log(
    '%c ----------IN THE APP CONTEXT----------',
    'background: #222; color: #bada55',
  );

  console.log(
    `%c Rendering Count in App.js: << ${r.current} >>`,
    'color: hotpink',
  );

  console.log(
    '%c ----------IN THE APP CONTEXT----------',
    'background: #222; color: #bada55',
  );

  /*
    Reference: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css
    안드로이드 기반 휴대폰의 키보드를 열 때 높이가 축소되는 것을 막기 위한 방법이라고 합니다.
  */

  useEffect(() => {
    const preventShrinkViewportFromKeyboard = function () {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute(
        'content',
        viewport.content + ', height=' + window.innerHeight,
      );
    };

    window.addEventListener('load', preventShrinkViewportFromKeyboard);
    return () =>
      window.removeEventListener('load', preventShrinkViewportFromKeyboard);
  });

  return (
    <Layout>
      <Switch>
        {!window.localStorage.getItem('isOnboarding') ? <OnBoard /> : ''}
        <Route path="/login" component={Login} />
        <PrivateRoute path="/select" component={<Select />} />
        <PrivateRoute exact path="/" component={<Main />} />
        <PrivateRoute path="/new" component={<New />} />
        <PrivateRoute path="/achievement" component={<Achievement />} />
        <PrivateRoute path="/mypage" component={<MyPage />} />
        <PrivateRoute exact path="/search" component={<Search />} />
        <PrivateRoute
          exact
          path="/search/:monsterCode"
          component={<SearchDetail />}
        />
        <PrivateRoute
          exact
          path="/search/:monsterCode/:habitId"
          component={<SearchDetailHabit />}
        />
        <PrivateRoute
          exact
          path="/habit/:habitId"
          component={<HabitDetail />}
        />
        <PrivateRoute
          exact
          path="/habit/:habitId/edit"
          component={<HabitEdit />}
        />
        <PrivateRoute path="/notice" component={<Notice />} />
        <PrivateRoute exact path="/follow" component={<Follow />} />
      </Switch>
    </Layout>
  );
}

const Layout = styled.div`
  background: var(--bg-wrapper);
  display: flex;
  max-width: 414px;
  width: 100%;
  min-width: 280px;
  min-height: 100vh;
  height: -webkit-fill-available;
  /* height: calc(100vh - calc(100vh - 100%)); */
  margin: 0 auto;
  position: relative;
`;

export default App;
