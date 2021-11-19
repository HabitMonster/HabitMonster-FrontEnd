import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Profile } from '../../assets/images/placeholder';

const FollowData = ({ user }) => {
  const { monsterName, monsterImg, monsterCode, isFollowed } = user;
  return (
    <FollowDataItem>
      <Profile />
      {/* <Profile src={monsterImg}/> */}
      <ProfileWrap>
        <p>{monsterName}</p>
        <p>{monsterCode}</p>
      </ProfileWrap>
      <FollowBtn isFollowed={isFollowed}>팔로우</FollowBtn>
    </FollowDataItem>
  );
};

export default FollowData;

const FollowDataItem = styled.li`
  cursor: pointer;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);
`;

const ProfileWrap = styled.div`
  color: var(--color-primary);
  display: flex;
  & p {
    font-size: var(--font-xxs);
    font-weight: var(--weight-bold);
    line-height: 14px;
  }
  & :nth-child(2) {
    color: var(--color-primary-deemed);
    font-weight: var(--weight-semi-regular);
  }
`;

const FollowBtn = styled.button`
  width: 56px;
  height: 22px;
  text-align: center;
  background-color: ${({ isFollowed }) =>
    isFollowed ? 'var(--bg-active)' : 'var(--bg-primary'};
`;

FollowData.propTypes = {
  user: PropTypes.object.isRequired,
  monsterName: PropTypes.string,
  monsterImg: PropTypes.string,
  monsterCode: PropTypes.string,
  isFollowed: PropTypes.bool,
};
