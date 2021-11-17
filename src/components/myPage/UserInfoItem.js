import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, whiteOpacity } from '../../styles';
import { EditIcon, Copy } from '../../assets/icons/common';

const UserInfoItem = ({ userInfoItem }) => {
  const {
    title,
    contents,
    handleClick,
    handleClipBoard,
    isLogout,
    isDeleteAccount,
    isCopy,
  } = userInfoItem;
  const isPossibleEdit = !!handleClick;

  return (
    <InfoListItem isCursor={isPossibleEdit} onClick={handleClick}>
      <DefaultTitle>{title}</DefaultTitle>
      <PrivateTextWrap>
        {contents && <PrivateText>{contents}</PrivateText>}
        {isPossibleEdit && !isLogout && !isDeleteAccount && <EditIcon />}
        {isCopy && (
          <CopyWrap onClick={handleClipBoard}>
            <Copy />
          </CopyWrap>
        )}
      </PrivateTextWrap>
    </InfoListItem>
  );
};

export default UserInfoItem;

const InfoListItem = styled.li`
  color: var(--color-primary);
  cursor: ${({ isCursor }) => (isCursor ? 'pointer' : 'default')};
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);

  & :nth-child(4) {
    margin-right: 6px;
    border-bottom: none;
  }
`;

const DefaultTitle = styled.p`
  ${fontSize('15px')};
  line-height: 18px;
  font-weight: var(--weight-bold);
  ${whiteOpacity('0.8')};
`;

const PrivateTextWrap = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > svg {
    display: block;

    margin-left: 8px;
  }
`;

const LimitText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
`;

const CopyWrap = styled.div`
  padding-left: 8px;
  cursor: pointer;
`;

const PrivateText = styled.p`
  ${fontSize('14px')};
  line-height: 17px;
  font-weight: var(--weight-regular);
  ${whiteOpacity('0.8')};
  height: 17px;
`;

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};
