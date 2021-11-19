import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { authState } from '../../recoil/states/auth';
import { auth } from '../../api';
import { GoogleSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loadGoogleScript } from '../../utils/loadGoogleScript';

import { loginBtnStyle } from '../../styles/Mixin';

const GoogleLogin = () => {
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const socialName = 'google';
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    // 구글 API 라이브러리가 실행되는 동시에 다음의 작업이 실행되도록 onGoogleScriptLoad함수를 정의합니다.
    // 정의만 할 뿐입니다. 즉시 실행되지 않습니다.
    window.onGoogleScriptLoad = () => {
      // 구글 API 라이브러리 중 gapi 객체를 불러오고, 그 중에서 auth2 기능을 실행합니다.
      // gapi는 구글 API의 모든 기능 (auth2, signin2 등)을 사용하는데 필요한 root 객체의 역할을 합니다.
      window.gapi.load('auth2', () => {
        (async () => {
          // gapi.auth2 를 본격적으로 사용하기에 앞서 다음과 같이 초기화합니다.
          // 성공적으로 초기화했을 경우, gapi.auth2는 GoogleAuth 객체를 반환합니다.
          // GoogleAuth 객체를 통해서 실제로 로그인, 로그아웃 등등의 기능을 실행할 수 있습니다.
          // 이 객체를 변수 googleAuth2에 저장합니다.
          const googleAuth2 = await window.gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: 'profile email',
          });

          // GoogleAuth 객체를 특정 클릭 핸들러에 연결합니다.
          googleAuth2.attachClickHandler(
            // 저희는 직접 만든 커스텀 로그인 버튼에 연결하겠습니다.
            // attachClickHandler는 다음의 argument를 받습니다.

            // container => 클릭 핸들러를 연결할 요소. (커스텀 로그인 버튼)
            googleLoginBtn.current,
            // options => 인증 과정에서 설정할 수 있는 옵션입니다.
            // 필요한 옵션은 앞서 초기화하면서 다 부여해놓았으므로 빈 객체를 넘깁니다.
            {},
            // onSuccess => 인증 성공 시 호출할 함수입니다.
            // 인증을 성공하게 되면 구글로부터 사용자 정보를 받습니다. (이름, 이메일 등의 프로필, Access Token, Id Token 등의 인증 세션 응답 개체)
            // 이 사용자 정보를 googleUser로 받아옵니다.
            (googleUser) => {
              // 사용자 정보 중 Id Token을 추출해서 서버로 보냅니다. (Id Token은 사전에 서버측과 약속된 값입니다.)
              // getAuthResponse() => 사용자 정보 중에서 인증 세션 응답 개체를 반환합니다.
              // 서버로부터 Access Token과 Refesh Token을 받아옵니다.
              async function getTokenWithGoogle() {
                try {
                  const { data } = await auth.getSocialLogin(
                    socialName,
                    googleUser.getAuthResponse().id_token,
                  );

                  // 서버로부터 받아온 각 토큰을 로컬스토리지에 저장합니다.
                  window.localStorage.setItem(
                    'habitAccessToken',
                    data.accessToken,
                  );
                  window.localStorage.setItem(
                    'habitRefreshToken',
                    data.refreshToken,
                  );

                  // 신규회원일 경우 다음과 같은 값을 전역 변수로 설정하고 몬스터 선택 페이지로 이동합니다.
                  if (data.statusCode === OK && data.isFirstLogin) {
                    setAuth({
                      isLogin: true,
                      isFirstLogin: data.isFirstLogin,
                    });
                    history.replace('/monster');
                    return;
                  }

                  // 기존회원일 경우 다음과 같은 값을 전역변수로 설정하고 메인페이지로 이동합니다.
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
              console.log(error);
            },
          );
        })();
      });
    };

    // 모든 준비가 끝났으므로 준비했던 구글 API 스크립트를 로드합니다.
    // 구글 API 스크립트가 성공적으로 로드되는 즉시, 앞서 정의한 과정이 이어서 진행됩니다.
    // useEffect를 통해 로그인 창에 들어올 때마다 앞의 과정이 실행됩니다.
    loadGoogleScript();
  }, [setAuth, history]);

  return (
    <>
      <LoginBtn ref={googleLoginBtn} className="googleLogin">
        <GoogleSymbol />
        <SocialTitle>Google로 시작하기</SocialTitle>
      </LoginBtn>
    </>
  );
};

const LoginBtn = styled.div`
  ${loginBtnStyle('white')}
  /* display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  background-color: var(--color-white);
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer; */

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

export default GoogleLogin;
