import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Loading from '../pages/Loading';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import Avatar from '../pages/Avatar';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RecoilRoot>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/avatar" component={Avatar} />
            <>
              <Route exact path="/" component={Main} />
              <Route path="/achievement" component={Achievement} />
              <Route path="/new" component={New} />
              <Route path="/mypage" component={MyPage} />
              <Gnb />
            </>
          </Switch>
        </Layout>
      </RecoilRoot>
    </Suspense>
  );
}

const Layout = styled.div`
  background: var(--bg-main);
  display: flex;
  max-width: 360px;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

export default App;
