import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { searchUserReFetchToggler } from '../../recoil/states/search';
import { currentUserMonsterCodeSelector } from '../../recoil/states/user';

import { MonsterThumbnailWrapper } from '../monster';

const UserSection = ({ monster, habits, userInfo, followers }) => {
  const refreshSearchUserInfo = useSetRecoilState(searchUserReFetchToggler);
  const myMonsterCode = useRecoilValue(currentUserMonsterCodeSelector);
  const location = useLocation();

  return (
    <Section>
      <MonsterThumbnailWrapper
        isProfile={true}
        monsterLevel={monster.monsterLevel}
        monsterId={monster.monsterId}
      />
      <Box>
        <p>{habits.length}</p>
        <p className="box-title">습관</p>
      </Box>
      <Box>
        <FollowLink
          to={{
            pathname: `/follow/${userInfo.monsterCode}`,
            search: `?tab=followers`,
            state: {
              isMe: myMonsterCode === userInfo.monsterCode,
              isFromMyPage: false,
              prev: [...location.state?.prev, location.pathname],
            },
          }}
          onClick={() => {
            refreshSearchUserInfo((id) => id + 1);
          }}
        >
          <p>{followers}</p>
          <p className="box-title">팔로워</p>
        </FollowLink>
      </Box>
      <Box>
        <FollowLink
          to={{
            pathname: `/follow/${userInfo.monsterCode}`,
            search: `?tab=following`,
            state: {
              isMe: myMonsterCode === userInfo.monsterCode,
              isFromMyPage: false,
              prev: [...location.state?.prev, location.pathname],
            },
          }}
          onClick={() => {
            refreshSearchUserInfo((id) => id + 1);
          }}
        >
          <p>{userInfo.followingsCount}</p>
          <p className="box-title">팔로잉</p>
        </FollowLink>
      </Box>
    </Section>
  );
};

UserSection.propTypes = {
  monster: PropTypes.object.isRequired,
  habits: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  followers: PropTypes.number.isRequired,
};

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 296px;
  margin: 0 auto;
  padding-top: 24px;
  font-family: var(--font-name-apple);
  font-size: var(--font-l);

  & .box-title {
    margin-top: 4px;
    font-size: 12px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
`;

const FollowLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  text-align: center;
`;

export default UserSection;
