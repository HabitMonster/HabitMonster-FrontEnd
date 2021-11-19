import React from 'react';
import styled from 'styled-components';

import {
  LoginTitle,
  GoogleLogin,
  KakaoLogin,
  NaverLogin,
} from '../components/login';

import '../assets/fonts/font.css';

const Login = () => {
  return (
    <>
      <Wrapper>
        <LoginTitle />
        <KakaoLogin />
        <GoogleLogin />
        <NaverLogin />
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
  font-family: var(--font-name-apple);
  font-size: var(--font-m);
  font-weight: var(--weight-bold);
  line-height: 25px;

  & .kakaoLogin,
  & .googleLogin,
  & .naverLogin {
    margin-bottom: 12px;
  }
`;

export default Login;
