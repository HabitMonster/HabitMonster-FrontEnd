import React from 'react';
import styled from 'styled-components';

import {
  LoginTitle,
  GoogleLogin,
  KakaoLogin,
  NaverLogin,
} from '../components/login';

import OnBoard from '../components/onBoard/OnBoard';

import { setFontStyles, setFlexStyles } from '../styles/Mixin';

const Login = () => {
  if (!window.localStorage.getItem('isOnboarding')) {
    return <OnBoard />;
  }

  return (
    <Wrapper>
      <LoginTitle />
      <KakaoLogin />
      <GoogleLogin />
      <NaverLogin />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  })}

  width: 100%;
  height: 100%;
  background-color: var(--bg-wrapper);
  ${setFontStyles({
    fontSize: 'm',
    fontWeight: 'bold',
    lineHeight: '25px',
  })}

  & .kakaoLogin,
  & .googleLogin,
  & .naverLogin {
    margin-bottom: 12px;
  }
`;

export default Login;
