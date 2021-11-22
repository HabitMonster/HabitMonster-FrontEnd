import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserMonsterCodeSelector } from '../../recoil/states/user';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MonsterThumbnailWrapper } from './';

const MonsterListItem = ({
  monsterName,
  id,
  width,
  height,
  thumbnailSize,
  monsterLevel,
  monsterCode,
  isFollowed,
  recommendationTitle,
  path,
}) => {
  // const monsterImageAlt =
  //   monsterName && monsterCode ? `${monsterName} - ${monsterCode}` : '';
  const history = useHistory();
  const currentUserMonsterCode = useRecoilValue(currentUserMonsterCodeSelector);

  return (
    <MonsterListItemWrap onClick={() => history.push(path)}>
      <ProfileWrap>
        <div>
          <MonsterThumbnailWrapper
            id={id}
            height={height}
            width={width}
            thumbnailSize={thumbnailSize}
            monsterLevel={monsterLevel}
          />
        </div>
        <TextWrap>
          <p>{monsterName}</p>
          <p>{monsterCode}</p>
          {recommendationTitle && <p>{recommendationTitle}</p>}
        </TextWrap>
      </ProfileWrap>
      {currentUserMonsterCode !== monsterCode && (
        <FollowBtn isFollowed={isFollowed}>
          {isFollowed ? '팔로잉' : '팔로우'}
        </FollowBtn>
      )}
    </MonsterListItemWrap>
  );
};

MonsterListItem.propTypes = {
  recommendationTitle: PropTypes.string,
  monsterName: PropTypes.string,
  monsterImg: PropTypes.string,
  monsterCode: PropTypes.string,
  isFollowed: PropTypes.bool,
  path: PropTypes.string,
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  thumbnailSize: PropTypes.string,
  monsterLevel: PropTypes.number,
};

const MonsterListItemWrap = styled.li`
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
