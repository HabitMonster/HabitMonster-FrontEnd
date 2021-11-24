import React, { useEffect } from 'react';
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
import { KakaoSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loginBtnStyle } from '../../styles/Mixin';

const KakaoLogin = () => {
  const history = useHistory();
  const socialName = 'kakao';
  const setAuth = useSetRecoilState(authState);
  const refetchHabit = useSetRecoilState(asyncHabitTogglerState);
  const refetchMonster = useSetRecoilState(monsterRefetchToggler);
  const refetchFollowerList = useSetRecoilState(followerListRefetchToggler);
  const refetchFollowingList = useSetRecoilState(followingListRefetchToggler);
  const resetShrinkSection = useResetRecoilState(monsterSectionShirnkToggler);

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
    getTokenWithKakao();
  }, [
    history,
    setAuth,
    refetchHabit,
    refetchMonster,
    refetchFollowerList,
    refetchFollowingList,
    resetShrinkSection,
  ]);

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
