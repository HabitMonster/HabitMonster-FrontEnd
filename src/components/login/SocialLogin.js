import React from 'react';
import styled from 'styled-components';
import {
  googleSymbol,
  kakaoSymbol,
  naverSymbol,
} from '../../assets/icons/loginSymbol';

const SocialLogin = (props) => {
  return (
    <BtnContainer className="BtnContainer">
      <LoginBtn className="kakaoLogin">
        <SocialSymbol className="kakaoSymbol" />
        <SocialTitle>카카오로 시작하기</SocialTitle>
      </LoginBtn>
      <LoginBtn className="googleLogin">
        <SocialSymbol className="googleSymbol" />
        <SocialTitle>Google로 시작하기</SocialTitle>
      </LoginBtn>
      <LoginBtn className="naverLogin">
        <SocialSymbol className="naverSymbol" />
        <SocialTitle>네이버로 시작하기</SocialTitle>
      </LoginBtn>
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
  margin-bottom: 84px;
`;

const LoginBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  background-color: var(--color-white);
  border-radius: var(--size-border-radius);

  &:hover {
    cursor: pointer;
  }

  &.kakaoLogin {
    background-color: var(--color-kakao);
  }

  &.googleLogin {
    background-color: var(--color-white);
  }

  &.naverLogin {
    color: var(--color-white);
    background-color: var(--color-naver);
  }
`;

const SocialSymbol = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 19px;
  position: absolute;

  &.kakaoSymbol {
    background-image: url(${kakaoSymbol});
  }
  &.googleSymbol {
    background-image: url(${googleSymbol});
  }
  &.naverSymbol {
    background-image: url(${naverSymbol});
  }
`;

const SocialTitle = styled.span`
  height: 24px;
  margin: 0 auto;
  line-height: 24px;
  font-family: Noto Sans KR Medium;
  font-size: var(--font-small);
`;

export default SocialLogin;
