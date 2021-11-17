import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Followers, Followings } from '../components/follow';

import { userApis } from '../api';

const FollowList = () => {
  const [followers, setFollowers] = useState([]);

  const getFollowerList = async () => {
    try {
      const { data } = await userApis.loadFollowers();
      if (data.statusCode === 200) {
        console.log('followerdata', data, data.followers);
        setFollowers(data.followers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowingList = async () => {
    try {
      const { data } = await userApis.loadFollowings();
      if (data.statusCode === 200) {
        console.log('followingdata', data, data.followings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowerList();
    getFollowingList();
  }, []);

  return (
    <Container>
      <div>
        팔로워 :<p>{setFollowers.monsterName}</p>
      </div>
    </Container>
  );
};

export default FollowList;

const Container = styled.div`
  width: 360px;
  height: 100%;
  /* position: relative; */
  background: var(--bg-wrapper);
  margin: 0 auto;
  padding-top: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-primary);
`;
