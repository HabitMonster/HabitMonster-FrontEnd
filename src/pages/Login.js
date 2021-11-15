import React from 'react';
import styled from 'styled-components';

import { SocialLogin, LoginTitle } from '../components/login';

import '../assets/fonts/font.css';

const Login = () => {
  return (
    <>
      <Wrapper>
        <LoginTitle />
        <SocialLogin />
      </Wrapper>
    </>
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
