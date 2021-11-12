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

    if (isMonsterPath && isLogin && !isFirstLogin) {
      history.replace('/');
      return;
    }

    if (isFirstLogin) {
      history.replace('/monster');
      return;
    }
  }, []);

  return (
    <Layout>
      <Route>
        <Switch>
          <Route path="/login" comp={Login} />
          <PrivateRoute path="/monster" comp={Monster} />
          <PrivateRoute path="/select" comp={MonsterSetting} />
          <PrivateRoute path="/guide" comp={MonsterGuide} />
          <>
            <PrivateRoute exact path="/" comp={Main} />
            <PrivateRoute exact path="/habit/:habitId" comp={HabitDetail} />
            <PrivateRoute exact path="/habit/:habitId/edit" comp={HabitEdit} />
            <PrivateRoute path="/achievement" comp={Achievement} />
            <PrivateRoute path="/new" comp={New} />
            <PrivateRoute path="/mypage" comp={MyPage} />
            <Gnb />
          </>
        </Switch>
      </Route>
    </Layout>
  );
}

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
