import React from 'react';
import styled from 'styled-components';

import { OnBoard } from '../components/onBoard';
import {
  LoginTitle,
  GoogleLogin,
  KakaoLogin,
  NaverLogin,
} from '../components/login';

import { setFontStyles, setFlexStyles } from '../styles';

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
