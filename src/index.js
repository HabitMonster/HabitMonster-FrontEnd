import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import DeviceDetector from './components/DeviceDetector';
import reportWebVitals from './reportWebVitals';
import App from './components/App';

import { GlobalStyle } from './styles/';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('load', function () {
  var viewport = document.querySelector('meta[name=viewport]');
  viewport.setAttribute(
    'content',
    viewport.content + ', height=' + window.innerHeight,
  );
});

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
window.addEventListener('touchend', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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

// if (process.env.NODE_ENV === 'development') {
//   reportWebVitals(console.log);
// }
serviceWorkerRegistration.register();
