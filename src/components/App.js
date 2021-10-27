import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Gnb from '../components/gnb/Gnb';

function App() {
  return (
    <Layout>
      <MobileView>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Gnb />
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
`;

export default App;
