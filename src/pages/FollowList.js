import React, { useState } from 'react';
import styled from 'styled-components';

import { FollowData } from '../components/myPage';
import { myPageApis } from '../api';

const FollowList = () => {
  const [isLoadFollower, setIsLoadFollower] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [isLoadFollowing, setIsLoadFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  const getFollowerList = async () => {
    try {
      const { data } = await myPageApis.loadFollowers();
      if (data.statusCode === 200) {
        console.log('followerdata', data, data.followers);
        setFollowerList(data.followers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowingList = async () => {
    try {
      const { data } = await myPageApis.loadFollowings();
      if (data.statusCode === 200) {
        console.log('followingdata', data, data.followings);
        setFollowingList(data.followings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getFollowerList();
  //   getFollowingList();
  // }, []);
  const list = [
    {
      email: 'abc@gmail.com',
      isFollowed: true,
      monsterCode: '12345',
      monsterImg: '',
      monsterName: '뽁아리',
    },
    {
      email: 'abc@gmail.com',
      isFollowed: false,
      monsterCode: '12395',
      monsterImg: '',
      monsterName: '뽁아리',
    },
    {
      email: 'abc@gmail.com',
      isFollowed: true,
      monsterCode: '10345',
      monsterImg: '',
      monsterName: '뽁아리',
    },
  ];

  return (
    <>
      <AcheiveContainer>
        <NavButtonWrap>
          <NavButtonItem>
            <NavButton
              onClick={() => {
                setIsLoadFollower(true);
              }}
              activeClassName="active"
            >
              팔로워
            </NavButton>
          </NavButtonItem>
          <NavButtonItem>
            <NavButton
              onClick={() => setIsLoadFollowing(true)}
              activeClassName="active"
            >
              팔로잉
            </NavButton>
          </NavButtonItem>
        </NavButtonWrap>
      </AcheiveContainer>
      <FollowDataList>
        {list.map((user) => {
          return <FollowData key={user.monsterCode} user={user} />;
        })}
      </FollowDataList>
    </>
  );
};

export default FollowList;

const AcheiveContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
  flex: 1 1 0;
`;

const NavButtonWrap = styled.ul`
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  list-style: none;
  margin: 0;
  padding-top: 52px;
`;

const NavButtonItem = styled.li`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 50%;
  height: 34px;
  position: relative;
`;

const NavButton = styled.button`
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

const FollowDataList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;
