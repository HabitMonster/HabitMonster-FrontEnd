import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { auth } from '../../api';
import { setCookie } from '../../utils/cookie';
import { KakaoSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';

const { Kakao } = window;

const KakaoLogin = () => {
  const history = useHistory();
  const socialName = 'kakao';

  useEffect(() => {
    if (!window.location.search) {
      return;
    }
    const kakaoAuthCode = window.location.search.split('=')[1];

    async function getTokenWithKakao() {
      try {
        const { data } = await auth.getSocialLogin(socialName, kakaoAuthCode);
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);

        if (data.statusCode === OK && data.isFirstLogin) {
          history.push('/avatar');
          return;
        }
        history.push('/');
      } catch (err) {
        console.error(err);
      }
    }
    getTokenWithKakao();
  }, []);

  const loginWithKakao = async () => {
    await Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_LOGIN_REDIRECT_URI,
    });
  };

  return (
    <React.Fragment>
      <LoginBtn className="kakaoLogin" onClick={loginWithKakao}>
        <KakaoSymbol />
        <SocialTitle>카카오로 시작하기</SocialTitle>
      </LoginBtn>
    </React.Fragment>
  );
};

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

  & > svg {
    width: 20px;
    height: 20px;
    margin-left: 19px;
    position: absolute;
  }
`;

const SocialTitle = styled.span`
  height: 24px;
  margin: 0 auto;
  line-height: 24px;
  font-family: Noto Sans KR Medium;
  font-size: var(--font-small);
`;

export default KakaoLogin;
