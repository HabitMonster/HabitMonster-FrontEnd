import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../recoil/states/auth';

import { auth } from '../../api';
import { KakaoSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loginBtnStyle } from '../../styles/Mixin';

const KakaoLogin = () => {
  const history = useHistory();
  const socialName = 'kakao';
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    if (!window.location.search) {
      return;
    }

    const kakaoAuthCode = window.location.search.split('=')[1];

    async function getTokenWithKakao() {
      try {
        const { data } = await auth.getSocialLogin(socialName, kakaoAuthCode);
        window.localStorage.setItem('habitAccessToken', data.accessToken);
        window.localStorage.setItem('habitRefreshToken', data.refreshToken);

        if (data.statusCode === OK && data.isFirstLogin) {
          setAuth({
            isLogin: true,
            isFirstLogin: data.isFirstLogin,
          });
          history.replace('/monster');
          return;
        }

        if (data.statusCode === OK && !data.isFirstLogin) {
          setAuth({
            isLogin: true,
            isFirstLogin: data.isFirstLogin,
          });
          history.replace('/');
          return;
        }
      } catch (err) {
        console.error(err.response);
      }
    }
    getTokenWithKakao();
  }, [history, setAuth]);

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT_URI}&response_type=code`;
  };

  return (
    <>
      <LoginBtn className="kakaoLogin" onClick={loginWithKakao}>
        <KakaoSymbol />
        <SocialTitle>카카오로 시작하기</SocialTitle>
      </LoginBtn>
    </>
  );
};

const LoginBtn = styled.div`
  ${loginBtnStyle('kakao')}
  /* display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  background-color: var(--color-white);
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer;
  background-color: var(--color-kakao); */

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
`;

export default KakaoLogin;
