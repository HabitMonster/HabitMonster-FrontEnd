import React from 'react';
import styled from 'styled-components';
import { GoogleLogin, KakaoLogin, NaverLogin } from './';

const SocialLogin = () => {
  return (
    <BtnContainer className="BtnContainer">
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
  margin-top: 30px;
  margin-bottom: 84px;
`;

export default SocialLogin;
