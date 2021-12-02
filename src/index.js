import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import DeviceDetector from './components/DeviceDetector';
import reportWebVitals from './reportWebVitals';
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

if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}

serviceWorkerRegistration.register();
