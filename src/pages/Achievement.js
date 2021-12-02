import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Statistics, GlobalStatistics } from '../components/achievment';
import { NavButtonHeader } from '../components/common';
import { Gnb } from '../components/gnb';

import { disappearScrollbar } from '../styles';

const Achievement = () => {
  return (
    <>
      <AcheiveContainer>
        <NavButtonHeader type="achievement" />
        <PageContentWrap>
          <Switch>
            <Route
              exact
              path="/achievement/statistics"
              component={Statistics}
            />
            <Route
              exact
              path="/achievement/global"
              component={GlobalStatistics}
            />
            <Redirect from="*" to="/achievement/statistics" />
          </Switch>
        </PageContentWrap>
      </AcheiveContainer>
      <Gnb />
    </>
  );
};

const AcheiveContainer = styled.div`
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
`;

const PageContentWrap = styled.div`
  height: calc(100% - 64px);
  padding-bottom: 64px;
  overflow-y: auto;
  ${disappearScrollbar()};
`;

export default Achievement;
