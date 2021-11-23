import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Profile } from '../../assets/images/placeholder';

const FollowListItem = ({ user }) => {
  const { monsterName, monsterId, monsterCode, isFollowed } = user;

  return (
    <FollowListItemWrap>
      {/* <Profile /> */}
      <ProfileWrap>
        <ALink to="">
          <Profile src={monsterId} />
        </ALink>
        <TextWrap>
          <ALink to="">{monsterName}</ALink>
          <p>{monsterCode}</p>
        </TextWrap>
      </ProfileWrap>
      <FollowBtn isFollowed={isFollowed}>팔로우</FollowBtn>
    </FollowListItemWrap>
  );
};

export default FollowListItem;

const FollowListItemWrap = styled.li`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const ProfileWrap = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
`;

const TextWrap = styled.div`
  margin-left: 12px;

  & p {
    color: var(--color-primary-deemed);
    font-size: var(--font-xxs);
    font-weight: var(--weight-semi-regular);
    margin-top: 7px;

    /* &:nth-child(2) {
      color: var(--color-primary-deemed);
      font-weight: var(--weight-semi-regular);
    } */
  }
`;

const ALink = styled(Link)`
  color: var(--color-primary);
  font-size: var(--font-xxs);
  font-weight: var(--weight-bold);
  line-height: 14px;
  text-decoration: none;
`;

const FollowBtn = styled.button`
  background-color: ${({ isFollowed }) =>
    isFollowed ? 'var(--bg-active)' : 'var(--bg-primary)'};
  border: 0;
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  color: var(--color-primary);
  font-size: var(--font-xxs);
  line-height: 14px;
  padding: 4px 12px;
  outline: 0;
  text-align: center;
`;

FollowListItem.propTypes = {
  user: PropTypes.object.isRequired,
  monsterName: PropTypes.string,
  monsterImg: PropTypes.string,
  monsterCode: PropTypes.string,
  isFollowed: PropTypes.bool,
};
