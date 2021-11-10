import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './route';
import { RecoilRoot } from 'recoil';

import Loading from '../pages/Loading';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import Monster from '../pages/Monster';
import MonsterSetting from '../pages/MonsterSetting';
import NewHabitForm from '../pages/NewHabitForm';
import NewHabitPresetList from '../pages/NewHabitPresetList';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RecoilRoot>
        <Layout>
          <Route>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/monster" component={Monster} />
              <Route path="/select" component={MonsterSetting} />
              <>
                <PrivateRoute exact path="/" component={Main} />
                <PrivateRoute path="/achievement" component={Achievement} />
                <PrivateRoute path="/new" component={New} />
                <PrivateRoute path="/mypage" component={MyPage} />
                <Gnb />
              </>
            </Switch>
          </Route>
        </Layout>
      </RecoilRoot>
    </Suspense>
  );
}

// 컨텐츠가 많지 않으면 아래쪽이 비는건 어쩔 수 없다 백그라운드를 채워 주어야 하는데 어쯔라고..
const Layout = styled.div`
  background: var(--color-white);
  display: flex;
  max-width: 360px;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;
export default App;
