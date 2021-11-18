import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../recoil/states/auth';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import Monster from '../pages/Monster';
import MonsterSetting from '../pages/MonsterSetting';
import MonsterGuide from '../pages/MonsterGuide';
import HabitDetail from '../pages/HabitDetail';
import HabitEdit from '../pages/HabitEdit';
import OnBoard from './onBoard/OnBoard';
import Notice from './myPage/Notice';
import FollowList from '../pages/FollowList';
import Search from '../pages/Search';
import SearchDetail from '../pages/SearchDetail';

function App() {
  const { isFirstLogin, isLogin } = useRecoilValue(authState);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.replace('/login');
      return;
    }

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
      <Switch>
        {!window.localStorage.getItem('isOnboarding') ? <OnBoard /> : ''}
        <Route path="/login" component={Login} />
        <Route path="/monster" component={Monster} />
        <Route path="/select" component={MonsterSetting} />
        <Route path="/guide" component={MonsterGuide} />
        <>
          <Route exact path="/" component={Main} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/:code" component={SearchDetail} />
          <Route exact path="/habit/:habitId" component={HabitDetail} />
          <Route exact path="/habit/:habitId/edit" component={HabitEdit} />
          <Route path="/achievement" component={Achievement} />
          <Route path="/new" component={New} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/notice" component={Notice} />
          <Route path="/follow" component={FollowList} />
          <Gnb />
        </>
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
