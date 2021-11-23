import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import DeviceDetector from './components/DeviceDetector';
import App from './components/App';

import { GlobalStyle } from './styles/';

import './assets/fonts/font.css';

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <RecoilRoot>
      <DeviceDetector>
        <App />
      </DeviceDetector>
    </RecoilRoot>
  </Router>,
  document.getElementById('root'),
);
