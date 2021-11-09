import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { auth } from '../../api';
import { setCookie } from '../../utils/cookie';
import { NaverSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';

const { naver } = window;

const NaverLogin = () => {
  const history = useHistory();
  const naverRef = useRef();
  const socialName = 'naver';

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
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);

        if (data.statusCode === OK && data.isFirstLogin) {
          localStorage.setItem('isFirstLogin', data.isFirstLogin);
          history.replace('/monster');
          return;
        }

        if (data.statusCode === OK && !data.isFirstLogin) {
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
    <React.Fragment>
      <div ref={naverRef} id="naverIdLogin"></div>
      <LoginBtn className="naverLogin" onClick={handleClick}>
        <NaverSymbol />
        <SocialTitle>네이버로 시작하기</SocialTitle>
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
  cursor: pointer;
  color: var(--color-white);

  &.naverLogin {
    background-color: var(--color-naver);
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

export default NaverLogin;
