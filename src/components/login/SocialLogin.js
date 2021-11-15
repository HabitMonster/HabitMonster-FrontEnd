import React from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { GoogleLogin, KakaoLogin, NaverLogin } from './';
import { authState } from '../../recoil/states/auth';

const SocialLogin = () => {
  const { isLogin, isFirstLogin } = useRecoilValue(authState);

  if (isLogin && isFirstLogin) {
    return <Redirect to="/monster" />;
  }

  if (isLogin) {
    return <Redirect to="/" />;
  }
  console.log('socialLogin render');

  return (
    <BtnContainer>
      <KakaoLogin />
      <GoogleLogin />
      <NaverLogin />
    </BtnContainer>
  );
};

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export default SocialLogin;
