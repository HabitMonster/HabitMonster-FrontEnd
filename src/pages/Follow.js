import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { refreshSearchUserState } from '../recoil/states/search';

import { MonsterListItem } from '../components/monster';
import { BackButtonHeader } from '../components/common';
import { Gnb } from '../components/gnb';

import { userApis } from '../api';
import { OK } from '../constants/statusCode';

import { disappearScrollbar, setFontStyles } from '../styles/Mixin';

const Follow = () => {
  const history = useHistory();
  const location = useLocation();
  const [followList, setFollowList] = useState(null);

  const userMonsterCode = location.pathname.split('/')[2];

  const tabType = location?.search?.split('tab=')?.[1];
  const isFollowTab = tabType === 'followers' || tabType === 'following';
  const isActiveTab = (type) => tabType === type;

  const refreshSearchUserInfo = useSetRecoilState(refreshSearchUserState);
  const isMe = location.state?.isMe;
  const isFromMyPage = location.state?.isFromMyPage;

  const getUserList = useCallback(async () => {
    if (!isFollowTab) {
      return;
    }

    await setFollowList(null);

    let getUserResponse =
      tabType === 'followers'
        ? userApis.getUserFollowers(userMonsterCode)
        : userApis.getUserFollowings(userMonsterCode);

    const { data } = await getUserResponse;

    if (data.statusCode === OK) {
      const followList =
        tabType === 'followers' ? data.followers : data.followings;
      setFollowList(followList);
    }
  }, [tabType, isFollowTab, userMonsterCode]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  useEffect(() => {
    if (!isFollowTab) {
      history.replace(`/follow/${userMonsterCode}?tab=followers`, null);
    }
  }, [history, tabType, isFollowTab, userMonsterCode]);

  const onClickgoBack = () => {
    refreshSearchUserInfo((id) => id + 1);

    const copyStack = location.state?.prev?.slice();
    const path = copyStack.pop();
    history.replace(path, { prev: copyStack });
  };

  if (isMe === undefined && isFromMyPage === undefined) {
    history.replace('/');
    return;
  }

  return (
    <>
      <FollowContainer>
        <BackButtonHeader onButtonClick={onClickgoBack} />
        <NavButtonWrap>
          <NavButtonItem>
            <NavButton
              isActive={() => isActiveTab('followers')}
              to={{
                pathname: `/follow/${userMonsterCode}`,
                search: `?tab=followers`,
                state: {
                  isMe,
                  isFromMyPage,
                  prev: [...location.state?.prev],
                },
              }}
              activeClassName="active"
            >
              팔로워
            </NavButton>
          </NavButtonItem>
          <NavButtonItem>
            <NavButton
              isActive={() => isActiveTab('following')}
              to={{
                pathname: `/follow/${userMonsterCode}`,
                search: `?tab=following`,
                state: {
                  isMe,
                  isFromMyPage,
                  prev: [...location.state?.prev],
                },
              }}
              activeClassName="active"
            >
              팔로잉
            </NavButton>
          </NavButtonItem>
        </NavButtonWrap>
        {followList?.length >= 1 && (
          <FollowListWrap>
            <FollowList>
              {followList.map((user) => {
                return (
                  <MonsterListItem
                    key={user.monsterCode}
                    monsterId={user.monsterId}
                    nickName={user.nickName}
                    monsterCode={user.monsterCode}
                    isFollowed={user.isFollowed}
                    path={`/search/${user.monsterCode}`}
                  />
                );
              })}
            </FollowList>
          </FollowListWrap>
        )}
        {followList?.length === 0 && (
          <EmptyPlace>
            <p>
              {tabType === 'following'
                ? '팔로잉하는 친구가 없습니다'
                : '팔로워가 없습니다'}
            </p>
          </EmptyPlace>
        )}
      </FollowContainer>
      <Gnb />
    </>
  );
};

const FollowContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 80px);
  flex: 1 1 0;
`;

const NavButtonWrap = styled.ul`
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  height: 40px;
  list-style: none;
  margin: 0;
`;

const NavButtonItem = styled.li`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 50%;
  height: 40px;
  position: relative;
  padding-top: 4px;
`;

const NavButton = styled(NavLink)`
  background-color: transparent;
  border: 1px solid transparent;
  color: rgba(248, 248, 248, 0.6);
  cursor: pointer;
  ${setFontStyles({
    fontSize: 'xs',
    fontWeight: 'bold',
    lineHeight: '19px',
  })}
  outline: 0;
  text-decoration: none;
  &:hover {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
  &.active {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
`;

const FollowListWrap = styled.ul`
  height: calc(100% - 120px);
  padding-top: 16px;
  overflow-y: auto;
  ${disappearScrollbar()};
`;

const FollowList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

const EmptyPlace = styled.div`
  height: calc(100% - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xs',
      fontWeight: 'semi-regular',
      lineHeight: '21px',
    })}
    outline: 0;
    opacity: 0.6;
  }
`;

export default Follow;
