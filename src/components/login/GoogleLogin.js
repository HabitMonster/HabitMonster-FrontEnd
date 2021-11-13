import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../recoil/states/auth';

import { auth } from '../../api';
import { setCookie } from '../../utils/cookie';
import { GoogleSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';

const GoogleLogin = () => {
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const socialName = 'google';
  const setAuth = useSetRecoilState(authState);
  console.log('googleLoginRender');

  useEffect(() => {
    googleSDK();
  }, []);

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'profile email',
        });

        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            async function getTokenWithGoogle() {
              console.log(googleUser);
              try {
                const { data } = await auth.getSocialLogin(
                  socialName,
                  googleUser.getAuthResponse().id_token,
                );
                console.log('성공', data);

                window.localStorage.setItem('habitAccess', data.accessToken);
                window.localStorage.setItem('habitRefresh', data.refreshToken);

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

            getTokenWithGoogle();
          },
          (error) => {
            console.error(error);
          },
        );
      });
    };

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  };

  return (
    <React.Fragment>
      <LoginBtn ref={googleLoginBtn} id="gSignInWrapper">
        <GoogleSymbol />
        <SocialTitle>Google로 시작하기</SocialTitle>
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
  border-radius: var(--border-radius-checkBtn);

  &:hover {
    cursor: pointer;
  }

  &.googleLogin {
    background-color: var(--color-white);
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
  font-size: var(--font-m);
`;

export default GoogleLogin;
