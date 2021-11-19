import React, { useRef, useEffect, Fragment } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../recoil/states/auth';

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
import FollowList from '../pages/FollowList';
import Search from '../pages/Search';
import SearchDetail from '../pages/SearchDetail';
import Select from '../pages/Select';

function App() {
  const { isFirstLogin, isLogin } = useRecoilValue(authState);
  const location = useLocation();
  const r = useRef(1);
  console.log(
    '%c ----------IN THE APP CONTEXT----------',
    'background: #222; color: #bada55',
  );
  console.log(
    `%c The current path is ${location.pathname} in the App. this means The App should render ${location.pathname}`,
    'color: hotpink',
  );

  console.log(`%c user Auth State [isLogin] : ${isLogin}`, 'color: hotpink');
  console.log(
    `%c user Auth State [isFirstLogin] : ${isFirstLogin}`,
    'color: hotpink',
  );

  console.log(
    `%c Rendering Count in App.js: << ${r.current} >>`,
    'color: hotpink',
  );

  console.log(
    '%c ----------IN THE APP CONTEXT----------',
    'background: #222; color: #bada55',
  );

  useEffect(() => {
    r.current += 1;
  });

  return (
    <Layout>
      <Switch>
        {!window.localStorage.getItem('isOnboarding') ? <OnBoard /> : ''}
        <Route path="/login" component={Login} />
        <Fragment>
          <Switch>
            <PrivateRoute exact path="/" component={<Main />} />
            <PrivateRoute path="/select" component={<Select />} />
            <PrivateRoute path="/new" component={<New />} />
            <PrivateRoute path="/achievement" component={<Achievement />} />
            <PrivateRoute path="/mypage" component={<MyPage />} />

            <PrivateRoute exact path="/search" component={<Search />} />
            <PrivateRoute
              exact
              path="/search/:code"
              component={<SearchDetail />}
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
            <PrivateRoute path="/follow" component={<FollowList />} />
          </Switch>
          <Gnb />
        </Fragment>
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
