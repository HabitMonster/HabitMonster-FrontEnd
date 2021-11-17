import React from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  LoginTitle,
  GoogleLogin,
  KakaoLogin,
  NaverLogin,
} from '../components/login';

import { authState } from '../recoil/states/auth';
import '../assets/fonts/font.css';

const Login = () => {
  const { isLogin, isFirstLogin } = useRecoilValue(authState);

  if (isLogin && isFirstLogin) {
    return <Redirect to="/monster" />;
  }

  if (isLogin) {
    return <Redirect to="/" />;
  }

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

  & .kakaoLogin,
  & .googleLogin,
  & .naverLogin {
    margin-bottom: 12px;
  }
`;

export default Login;
