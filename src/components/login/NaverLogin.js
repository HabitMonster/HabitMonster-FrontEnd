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
import { NaverSymbol } from '../../assets/icons/loginSymbol';
import { OK } from '../../constants/statusCode';
import { loginBtnStyle } from '../../styles/Mixin';

const { naver } = window;

const NaverLogin = () => {
  const history = useHistory();
  const naverRef = useRef();
  const socialName = 'naver';
  const setAuth = useSetRecoilState(authState);
  const refetchHabit = useSetRecoilState(asyncHabitTogglerState);
  const refetchMonster = useSetRecoilState(monsterRefetchToggler);
  const refetchFollowerList = useSetRecoilState(followerListRefetchToggler);
  const refetchFollowingList = useSetRecoilState(followingListRefetchToggler);
  const resetShrinkSection = useResetRecoilState(monsterSectionShirnkToggler);

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
        // console.log(data);
        window.localStorage.setItem('habitAccessToken', data.accessToken);
        window.localStorage.setItem('habitRefreshToken', data.refreshToken);

        if (data.statusCode === OK && data.isFirstLogin) {
          setAuth({
            isLogin: true,
            isFirstLogin: data.isFirstLogin,
          });
          history.replace('/select');
          resetShrinkSection();
          return;
        }

        if (data.statusCode === OK && !data.isFirstLogin) {
          setAuth({
            isLogin: true,
            isFirstLogin: data.isFirstLogin,
          });
          refetchHabit((prev) => prev + 1);
          refetchMonster((prev) => prev + 1);
          refetchFollowerList((prev) => prev + 1);
          refetchFollowingList((prev) => prev + 1);
          resetShrinkSection();
          history.replace('/');
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    getTokenWithNaver();
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(naverRef.current);
    naverRef.current.children[0].click();
  };

  return (
    <>
      <LoginBtn className="naverLogin" onClick={handleClick}>
        <div ref={naverRef} id="naverIdLogin"></div>
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
