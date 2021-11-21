import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { myPageApis } from '../api';
import { OK } from '../constants/statusCode';

import { MonsterListItem } from '../components/monster';
import { BackButtonHeader } from '../components/common';

const FollowPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [followList, setFollowList] = useState([]);
  const tabType = location?.search?.split('tab=')?.[1];
  const isCorrectTabType = tabType === 'followers' || tabType === 'following';
  const isActiveTab = (type) => tabType === type;
  const goToMyPage = () => history.push('/mypage/information');

  useEffect(() => {
    if (!isCorrectTabType) {
      history.replace('/follow?tab=followers', null);
    }
  }, [history, tabType, isCorrectTabType]);

  const getUserList = useCallback(async () => {
    if (!isCorrectTabType) return;
    console.log('tabType', tabType);

    let getUserResponse = myPageApis.loadFollowers;

    if (tabType === 'following') {
      getUserResponse = myPageApis.loadFollowings;
    }

    const { data } = await getUserResponse();

    if (data.statusCode === OK) {
      const followList =
        tabType === 'followers' ? data.followers : data.followings;
      console.log('followerdata', followList);
      setFollowList(followList ?? []);
    }
  }, [tabType, isCorrectTabType]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  //@jaekyung Todo. followlist 컴포넌트 만들어서 재활용하게 할 예정임
  return (
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
      <FollowListWrap>
        {followList?.length > 0 &&
          followList.map((user) => {
            return <MonsterListItem key={user.monsterCode} user={user} />;
          })}
      </FollowListWrap>
    </FollowContainer>
  );
};

export default FollowPage;

const FollowContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
  flex: 1 1 0;
  padding-top: 24px;
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
