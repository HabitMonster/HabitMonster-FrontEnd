import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import DeviceDetector from './components/DeviceDetector';
import App from './components/App';

import { GlobalStyle } from './styles/';

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <GlobalStyle />
      <DeviceDetector>
        <App />
      </DeviceDetector>
    </Router>
  </RecoilRoot>,
  document.getElementById('root'),
);
