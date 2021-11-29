import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { refreshSearchUserState } from '../recoil/states/search';

import { userApis } from '../api';
import { OK } from '../constants/statusCode';

import { MonsterListItem } from '../components/monster';
import { BackButtonHeader } from '../components/common';
import { Gnb } from '../components/gnb';

import { disappearScrollbar } from '../styles/Mixin';

const SearchDetailFollow = () => {
  const history = useHistory();
  const location = useLocation();
  const [followList, setFollowList] = useState(null);
  const tabType = location?.search?.split('tab=')?.[1];
  const userMonsterCode = location.pathname.split('/')[2];
  const isCorrectTabType = tabType === 'followers' || tabType === 'following';
  const isActiveTab = (type) => tabType === type;
  const refreshSearchUserInfo = useSetRecoilState(refreshSearchUserState);

  const onClickgoBack = () => {
    refreshSearchUserInfo((id) => id + 1);
    if (history.length <= 2) {
      history.replace(`/`);
      return;
    }
    history.goBack();
  };

  useEffect(() => {
    if (!isCorrectTabType) {
      history.replace('/follow?tab=followers', null);
    }
  }, [history, tabType, isCorrectTabType]);

  const getUserList = useCallback(async () => {
    if (!isCorrectTabType) {
      return;
    }

    await setFollowList(null);

    let getUserResponse = userApis.getUserFollowers(userMonsterCode);

    if (tabType === 'following') {
      getUserResponse = userApis.getUserFollowings(userMonsterCode);
    }

    const { data } = await getUserResponse;

    if (data.statusCode === OK) {
      const followList =
        tabType === 'followers' ? data.followers : data.followings;

      setFollowList(followList ?? []);
    }
  }, [tabType, isCorrectTabType]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

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

export default SearchDetailFollow;

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
  border: 0;
  border: 1px solid transparent;
  color: rgba(248, 248, 248, 0.6);
  cursor: pointer;
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  outline: 0;
  line-height: 19px;
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
    color: var(--color-primary);
    opacity: 0.6;
    font-size: var(--font-xs);
    line-height: 21px;
    font-weight: var(--weight-semi-regular);
  }
`;
