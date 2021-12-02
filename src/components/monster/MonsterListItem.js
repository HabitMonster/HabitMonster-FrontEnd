import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  recommendedUserListRefetchToggler,
  searchUserReFetchToggler,
} from '../../recoil/states/search';
import {
  currentUserMonsterCodeSelector,
  myFollowListByType,
} from '../../recoil/states/user';

import { userApis } from '../../api';

import { MonsterThumbnailWrapper } from './';

import { OK } from '../../constants/statusCode';

import { setFontStyles, setFlexStyles } from '../../styles';

const MonsterListItem = ({
  monsterId,
  monsterCode,
  nickName,
  isFollowed,
  recommendationTitle,
  path,
}) => {
  const history = useHistory();
  const location = useLocation();
  const currentUserMonsterCode = useRecoilValue(currentUserMonsterCodeSelector);
  const refreshSearchUserInfo = useSetRecoilState(searchUserReFetchToggler);
  const refreshRecommendedUser = useSetRecoilState(
    recommendedUserListRefetchToggler,
  );
  const refetchFollowList = useSetRecoilState(myFollowListByType(''));
  const [_isFollowed, setIsFollowed] = useState(isFollowed);

  const handleRelationship = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await userApis.follow(monsterCode, _isFollowed);

      if (data.statusCode === OK) {
        setIsFollowed(data.isFollowed);
        refreshSearchUserInfo((id) => id + 1);
        refetchFollowList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MonsterListItemWrap
      onClick={() => {
        refreshRecommendedUser((id) => id + 1);
        history.push(path, {
          prev: [
            ...location.state.prev,
            `${location.pathname}${location.search}`,
          ],
        });
      }}
    >
      <ProfileWrap>
        <div>
          <MonsterThumbnailWrapper isProfile={true} monsterId={monsterId} />
        </div>
        <TextWrap>
          <p>{nickName}</p>
          <p>{monsterCode}</p>
          {recommendationTitle && <p>{recommendationTitle}</p>}
        </TextWrap>
      </ProfileWrap>
      {currentUserMonsterCode !== monsterCode && (
        <FollowBtn isFollowed={_isFollowed} onClick={handleRelationship}>
          {_isFollowed ? '팔로잉' : '팔로우'}
        </FollowBtn>
      )}
    </MonsterListItemWrap>
  );
};

MonsterListItem.propTypes = {
  monsterId: PropTypes.number,
  monsterCode: PropTypes.string,
  nickName: PropTypes.string,
  isFollowed: PropTypes.bool,
  recommendationTitle: PropTypes.string,
  path: PropTypes.string,
};

export const MonsterListItemWrap = styled.li`
  height: 80px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  padding: 0 24px;
  cursor: pointer;
`;

const ProfileWrap = styled.div`
  color: var(--color-primary);
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
`;

const TextWrap = styled.div`
  height: 100%;
  margin-left: 12px;

  & p {
    ${setFontStyles({
      color: 'primary-deemed',
      fontSize: 'xxs',
      fontWeight: 'semi-regular',
      lineHeight: '14px',
    })}
    margin: 3px 0px;

    &:nth-child(1) {
      ${setFontStyles({
        color: 'primary',
        fontSize: 'xs',
        fontWeight: 'bold',
      })}
    }
  }
`;

const FollowBtn = styled.button`
  background-color: ${({ isFollowed }) =>
    isFollowed ? '#181819' : 'var(--bg-active)'};
  border: 0;
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
  padding: 4px 12px;
  outline: 0;
  text-align: center;
`;

export default MonsterListItem;
