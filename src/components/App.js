import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import Avatar from '../pages/Avatar';

import A from './testing';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <>
          <Route exact path="/" component={Main} />
          <Route path="/achievement" component={Achievement} />
          <Route path="/new" component={New} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/avatar" component={Avatar} />
          <Gnb />
        </>
      </Switch>
    </Layout>
  );
}

const Layout = styled.div`
  background: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 360px;
  min-height: 100vh;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

export default App;
