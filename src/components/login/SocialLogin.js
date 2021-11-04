import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { loginState } from '../../recoil/states';
import { GoogleLogin, KakaoLogin, NaverLogin } from './';

const SocialLogin = () => {
  const setIsFirstLogin = useSetRecoilState(loginState);

  return (
    <BtnContainer className="BtnContainer">
      <KakaoLogin setIsFirstLogin={setIsFirstLogin} />
      <GoogleLogin setIsFirstLogin={setIsFirstLogin} />
      <NaverLogin setIsFirstLogin={setIsFirstLogin} />
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
