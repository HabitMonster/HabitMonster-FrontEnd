import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { auth } from '../../api';
import { setCookie } from '../../utils/cookie';
import { naverSymbol } from '../../assets/icons/loginSymbol';

const { naver } = window;

const NaverLogin = ({ setIsFirstLogin }) => {
  const history = useHistory();
  const naverRef = useRef();
  const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const socialName = 'naver';

  useEffect(() => {
    initializeNaverLogin();
    getNaverAuthCode();
  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId,
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
    if (!window.location.hash) return;
    const naverAuthCode = window.location.hash.split('=')[1].split('&')[0];

    async function getTokenWithNaver() {
      try {
        const { data } = await auth.getSocialLogin(socialName, naverAuthCode);
        setIsFirstLogin(data.isFirstLogin);
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        history.push('/');
      } catch (err) {
        console.log(err);
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
        <SocialSymbol className="naverSymbol" />
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
  background-color: var(--color-naver);
`;

const SocialSymbol = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 19px;
  position: absolute;

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

NaverLogin.propTypes = {
  setIsFirstLogin: PropTypes.func.isRequired,
};

export default NaverLogin;
