import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { auth } from '../../api';
import { setCookie } from '../../utils/cookie';
import { GoogleSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';

const GoogleLogin = () => {
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const socialName = 'google';

  useEffect(() => {
    googleSDK();
  }, []);

  // SDK 초기 설정 및 내 API초기화
  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'profile email',
        });
        // 버튼 클릭시 사용자 정보 불러오기
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
            getTokenWithGoogle();
          },
          (error) => {
            console.error(error);
          },
        );
      });
    };

    // 구글 SDK 불러오기
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
  border-radius: var(--size-border-radius);

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
  font-size: var(--font-small);
`;

export default GoogleLogin;
