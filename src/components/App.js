import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/states/auth';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import { PrivateRoute } from './route';
import Monster from '../pages/Monster';
import MonsterSetting from '../pages/MonsterSetting';
import MonsterGuide from '../pages/MonsterGuide';
import HabitDetail from '../pages/HabitDetail';
import HabitEdit from '../pages/HabitEdit';

function App() {
  const { isFirstLogin, isLogin } = useRecoilValue(authState);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const monsterPath = ['select', 'guide', 'monster'];
    const isMonsterPath = monsterPath.some((path) =>
      location.pathname.includes(path),
    );

    if (isMonsterPath && login && !isFirstLogin) {
      history.replace('/');
      return;
    }

    //*판단 해주세용
    // if (location.pathname.includes('login') && isLogin && !isFirstLogin) {
    //   history.replace('/');
    // }

    // if (isMonsterPath && isFirstLogin) {
    //   history.replace('/monster');
    //   return;
    // }

    if (isFirstLogin) {
      history.replace('/monster');
      return;
    }

    // if (isMonsterPath && isLogin) {
    //   history.replace('/');
    //   return;
    // }
  }, []);

  return (
    <Layout>
      <Route>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/monster" component={Monster} />
          <PrivateRoute path="/select" component={MonsterSetting} />
          <PrivateRoute path="/guide" component={MonsterGuide} />
          <>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/habit/:habitId" comp={HabitDetail} />
            <PrivateRoute exact path="/habit/:habitId/edit" comp={HabitEdit} />
            <PrivateRoute path="/achievement" component={Achievement} />
            <PrivateRoute path="/new" component={New} />
            <PrivateRoute path="/mypage" component={MyPage} />
            <Gnb />
          </>
        </Switch>
      </Route>
    </Layout>
  );
}

// 컨텐츠가 많지 않으면 아래쪽이 비는건 어쩔 수 없다 백그라운드를 채워 주어야 하는데 어쯔라고..
const Layout = styled.div`
  background: var(--bg-wrapper);
  display: flex;
  max-width: 360px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

export default App;
