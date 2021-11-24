import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState, useResetRecoilState } from 'recoil';

import { authState } from '../../recoil/states/auth';
import { asyncHabitTogglerState } from '../../recoil/states/habit';
import { monsterRefetchToggler } from '../../recoil/states/monster';
import {
  followerListRefetchToggler,
  followingListRefetchToggler,
} from '../../recoil/states/user';
import { monsterSectionShirnkToggler } from '../../recoil/states/ui';

import { auth } from '../../api';
import { GoogleSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loadGoogleScript } from '../../utils/loadGoogleScript';

import { loginBtnStyle } from '../../styles/Mixin';

/*
  각 로그인 컴포넌트는 중복된 로직을 전부 가지고 있습니다(sdk 적용 뺴고)
  해당 부분을 추상화하여 재사용을 할 수 있을 것 같습니다.

*/
const GoogleLogin = () => {
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const socialName = 'google';
  const setAuth = useSetRecoilState(authState);
  const refetchHabit = useSetRecoilState(asyncHabitTogglerState);
  const refetchMonster = useSetRecoilState(monsterRefetchToggler);
  const refetchFollowerList = useSetRecoilState(followerListRefetchToggler);
  const refetchFollowingList = useSetRecoilState(followingListRefetchToggler);
  const resetShrinkSection = useResetRecoilState(monsterSectionShirnkToggler);

  useEffect(() => {
    window.onGoogleScriptLoad = () => {
      window.gapi.load('auth2', () => {
        (async () => {
          const googleAuth2 = await window.gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: 'profile email',
          });
          googleAuth2.attachClickHandler(
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

                  /*
                    처음 로그인 하지 않은 유저는 습관과 몬스터 정보,
                    팔로워 팔로잉 정보가 등록되어있기 때문에 리페칭을 실시합니다.
                    유저 정보는 PrivateRoute에서 업데이팅을 하는 것 처럼 보이네요.
                    리페치는 전부 토글러로 하였습니다.
                  */
                  refetchHabit((prev) => prev + 1);
                  refetchMonster((prev) => prev + 1);
                  refetchFollowerList((prev) => prev + 1);
                  refetchFollowingList((prev) => prev + 1);
                  resetShrinkSection();

                  if (data.statusCode === OK && data.isFirstLogin) {
                    setAuth({
                      isLogin: true,
                      isFirstLogin: data.isFirstLogin,
                    });

                    history.replace('/select');
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
              console.log(error);
            },
          );
        })();
      });
    };

    loadGoogleScript();
  }, [
    setAuth,
    history,
    refetchHabit,
    refetchMonster,
    refetchFollowerList,
    refetchFollowingList,
    resetShrinkSection,
  ]);

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

  & > svg {
    width: 20px;
    height: 20px;
    margin-left: 19px;
    position: absolute;
  }
`;

const SocialTitle = styled.span`
  height: 24px;
  margin: 0px 78px 0px 99px;
`;

export default GoogleLogin;
