import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../recoil/states/auth';

import { auth } from '../../api';
import { GoogleSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';

const GoogleLogin = () => {
  console.log('googleLoginRender');
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const socialName = 'google';
  const setAuth = useSetRecoilState(authState);

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
              try {
                const { data } = await auth.getSocialLogin(
                  socialName,
                  googleUser.getAuthResponse().id_token,
                );

                window.localStorage.setItem(
                  'habitAccessToken',
                  data.accessToken,
                );
                window.localStorage.setItem(
                  'habitRefreshToken',
                  data.refreshToken,
                );

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
    <>
      <LoginBtn
        ref={googleLoginBtn}
        id="gSignInWrapper"
        className="googleLogin"
      >
        <GoogleSymbol />
        <SocialTitle>Google로 시작하기</SocialTitle>
      </LoginBtn>
    </>
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
