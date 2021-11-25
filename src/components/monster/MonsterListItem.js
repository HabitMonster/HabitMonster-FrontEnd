import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentUserMonsterCodeSelector,
  myFollowListByType,
} from '../../recoil/states/user';
import { refreshInfoState } from '../../recoil/states/search';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MonsterThumbnailWrapper } from './';

import { userApis } from '../../api';
import { OK } from '../../constants/statusCode';

const MonsterListItem = ({
  monsterId,
  monsterCode,
  monsterLevel,
  width,
  height,
  nickName,
  isFollowed,
  thumbnailSize,
  recommendationTitle,
  path,
}) => {
  // const monsterImageAlt =
  //   monsterName && monsterCode ? `${monsterName} - ${monsterCode}` : '';
  const history = useHistory();
  const currentUserMonsterCode = useRecoilValue(currentUserMonsterCodeSelector);
  const setRefreshInfo = useSetRecoilState(refreshInfoState);
  const refetchFollowList = useSetRecoilState(myFollowListByType(''));
  const [_isFollowed, setIsFollowed] = useState(isFollowed);

  const handleRelationship = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await userApis.follow(monsterCode, _isFollowed);

      if (data.statusCode === OK) {
        setIsFollowed(data.isFollowed);
        setRefreshInfo((id) => id + 1);
        refetchFollowList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MonsterListItemWrap onClick={() => history.push(path)}>
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
  recommendationTitle: PropTypes.string,
  monsterName: PropTypes.string,
  monsterId: PropTypes.number,
  monsterCode: PropTypes.string,
  isFollowed: PropTypes.bool,
  path: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  thumbnailSize: PropTypes.string,
  monsterLevel: PropTypes.number,
  nickName: PropTypes.string,
  user: PropTypes.object,
  handleRelationship: PropTypes.func,
};

export const MonsterListItemWrap = styled.li`
  height: 80px;
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
  height: 100%;
  margin-left: 12px;

  & p {
    color: var(--color-primary-deemed);
    font-size: var(--font-xxs);
    font-weight: var(--weight-semi-regular);
    line-height: 14px;
    margin: 3px 0px;

    &:nth-child(1) {
      color: var(--color-primary);
      font-size: var(--font-xs);
      font-weight: var(--weight-bold);
    }
  }
`;

const FollowBtn = styled.button`
  background-color: ${({ isFollowed }) =>
    isFollowed ? '#181819' : 'var(--bg-active)'};
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

export default MonsterListItem;
