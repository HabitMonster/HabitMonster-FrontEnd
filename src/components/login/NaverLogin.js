import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../recoil/states/auth';

import { auth } from '../../api';
import { NaverSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loginBtnStyle } from '../../styles/Mixin';

const { naver } = window;

const NaverLogin = () => {
  const history = useHistory();
  const naverRef = useRef();
  const socialName = 'naver';
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    initializeNaverLogin();
    getNaverAuthCode();
  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_LOGIN_REDIRECT_URI,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 55,
      },
    });

    naverLogin.init();
    naverLogin.logout();
  };

  const getNaverAuthCode = () => {
    if (!window.location.hash) {
      return;
    }

    const naverAuthCode = window.location.hash.split('=')[1].split('&')[0];

    async function getTokenWithNaver() {
      try {
        const { data } = await auth.getSocialLogin(socialName, naverAuthCode);
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
        console.error(err);
      }
    }

    getTokenWithNaver();
  };

  const handleClick = () => {
    naverRef.current.children[0].click();
  };

  return (
    <>
      <LoginBtn className="naverLogin" onClick={handleClick}>
        <div ref={naverRef} id="naverIdLogin" className="hide"></div>
        <NaverSymbol />
        <SocialTitle>네이버로 시작하기</SocialTitle>
      </LoginBtn>
    </>
  );
};

const LoginBtn = styled.div`
  ${loginBtnStyle('naver')}
  color: var(--color-white);

  & .hide {
    display: none;
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
  margin: 0px 83px 0px 103px;
`;

export default NaverLogin;
