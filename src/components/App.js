import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';

function App() {
  return (
    <Layout>
      <MobileView>
        <Switch>
          <Route exact path="/login" component={Login} />
          <>
            <Route exact path="/" component={Main} />
            <Route exact path="/achievement" component={Achievement} />
            <Route exact path="/new" component={New} />
            <Route exact path="/mypage" component={MyPage} />
            <Gnb />
          </>
        </Switch>
      </MobileView>
    </Layout>
  );
}

const Layout = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
`;

const MobileView = styled.div`
  width: 375px;
  height: 812px;
  background-color: #ffffff;
  position: relative;
`;

export default App;
