import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { SocialLogin, LoginTitle } from '../components/login';

import '../assets/fonts/font.css';

const Login = () => {
  if (localStorage.getItem('isFirstLogin') === 'true') {
    return <Redirect to="/monster" />;
  }

  return (
    <React.Fragment>
      <Wrapper className="titleContainer">
        <LoginTitle />
        <SocialLogin />
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--bg-wrapper);
`;

export default Login;
