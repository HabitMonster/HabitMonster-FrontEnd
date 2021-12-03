import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { auth } from '../../api';

import { KakaoSymbol } from '../../assets/icons/loginSymbol';

import { OK } from '../../constants/statusCode';

import { useRefreshUser } from '../../hooks';

import { loginBtnStyle } from '../../styles';

import { setCookie } from '../../utils/cookie';

const KakaoLogin = () => {
  const history = useHistory();
  const socialName = 'kakao';
  const refresher = useRefreshUser();

  useEffect(() => {
    if (!window.location.search) {
      return;
    }

    const kakaoAuthCode = window.location.search.split('=')[1];

    async function getTokenWithKakao() {
      try {
        const { data } = await auth.getSocialLogin(socialName, kakaoAuthCode);
        setCookie('habit-A-Token', data.accessToken);
        setCookie('habit-R-Token', data.refreshToken);
        refresher();
        if (data.statusCode === OK) {
          history.replace(data.isFirstLogin ? '/select' : '/');
        }
      } catch (err) {
        console.error(err.response);
      }
    }
    getTokenWithKakao();
  }, [history, refresher]);

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

  & > svg {
    width: 20px;
    height: 20px;
    margin-left: 19px;
    position: absolute;
  }
`;

const SocialTitle = styled.span`
  height: 24px;
  margin: 0px 83px 0px 103px;
`;

export default KakaoLogin;
