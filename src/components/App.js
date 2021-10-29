import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import Avatar from '../pages/Avatar';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <>
          <Route exact path="/" component={Main} />
          <Route exact path="/achievement" component={Achievement} />
          <Route exact path="/new" component={New} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/avatar" component={Avatar} />
          <Gnb />
        </>
      </Switch>
    </Layout>
  );
}

const Layout = styled.div`
  background: var(--color-layout);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  min-height: 100vh;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

export default App;
