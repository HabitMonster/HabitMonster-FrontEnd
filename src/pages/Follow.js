import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { myFollowListByType } from '../recoil/states/user';

import { MonsterListItem } from '../components/monster';
import { BackButtonHeader } from '../components/common';
import { Gnb } from '../components/gnb';

const FollowPage = () => {
  const history = useHistory();
  const location = useLocation();
  const tabType = location?.search?.split('tab=')?.[1];
  const isCorrectTabType = tabType === 'followers' || tabType === 'following';
  const getFollowList = useRecoilValue(myFollowListByType(tabType));
  const [followList, setFollowList] = useState(null);
  console.log('followlist', getFollowList, followList);
  const goToMyPage = () => history.push('mypage/information');
  const isActiveTab = (type) => tabType === type;
  // const userMonsterCode = location.pathname.split('/')[2];
  // const goToMyPage = () => {
  //   history.push(
  //     userInfoState.monsterCode === userMonsterCode
  //       ? '/mypage/information'
  //       : `/search/${userMonsterCode}`,
  //   );
  // };

  useEffect(() => {
    if (!isCorrectTabType) {
      history.replace('/follow?tab=followers', null);
    }
  }, [history, tabType, isCorrectTabType]);

  useEffect(() => {
    console.log('getFollowList', getFollowList);
    // recoil에서 가져온 FollowList를 담아준다
    setFollowList(getFollowList);
  }, [getFollowList]);

  // const getUserList = useCallback(async () => {
  //   if (!isCorrectTabType) {
  //     return;
  //   }

  //   await setFollowList(null);

  //   let getUserResponse =
  //     userInfoState.monsterCode === userMonsterCode
  //       ? myPageApis.loadFollowers()
  //       : userApis.getUserFollowers(userMonsterCode);

  //   if (tabType === 'following') {
  //     getUserResponse =
  //       userInfoState.monsterCode === userMonsterCode
  //         ? myPageApis.loadFollowings()
  //         : userApis.getUserFollowings(userMonsterCode);
  //   }

  //   const { data } = await getUserResponse;

  //   if (data.statusCode === OK) {
  //     const followList =
  //       tabType === 'followers' ? data.followers : data.followings;

  //     setFollowList(followList ?? []);
  //   }
  // }, [tabType, isCorrectTabType]);

  // useEffect(() => {
  //   getUserList();
  // }, [getUserList]);

  return (
    <>
      <FollowContainer>
        <BackBtnWrap>
          <BackButtonHeader onButtonClick={goToMyPage} />
        </BackBtnWrap>
        <NavButtonWrap>
          <NavButtonItem>
            <NavButton
              isActive={() => isActiveTab('followers')}
              to="/follow?tab=followers"
              activeClassName="active"
            >
              팔로워
            </NavButton>
          </NavButtonItem>
          <NavButtonItem>
            <NavButton
              isActive={() => isActiveTab('following')}
              to="/follow?tab=following"
              activeClassName="active"
            >
              팔로잉
            </NavButton>
          </NavButtonItem>
        </NavButtonWrap>
        {followList?.length >= 1 && (
          <FollowListWrap>
            {followList.map((user) => {
              return (
                <MonsterListItem
                  key={user.monsterCode}
                  monsterId={user.monsterId}
                  nickName={user.nickName}
                  monsterCode={user.monsterCode}
                  isFollowed={user.isFollowed}
                />
              );
            })}
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

export default FollowPage;

const FollowContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
  flex: 1 1 0;
  /* padding-top: 24px; */
`;

const BackBtnWrap = styled.div`
  padding: 0 16px;
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
  height: 34px;
  position: relative;
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
  color: var(--color-primary);
  margin: 0;
  padding: 16px 0 0;
`;

const EmptyPlace = styled.div`
  height: calc(100vh - (68px + 108px));
  display: felx;
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
