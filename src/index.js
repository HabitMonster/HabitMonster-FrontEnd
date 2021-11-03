import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

import { GlobalStyle } from './styles/';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
