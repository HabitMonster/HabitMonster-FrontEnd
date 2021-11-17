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
  font-weight: var(--font-weight-bold);
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
const CopyWrap = styled.div`
  padding-left: 8px;
  cursor: pointer;
`;
const PrivateText = styled.p`
  ${fontSize('14px')};
  font-weight: var(--weight-medium);
  color: var(--color-primary);
  ${whiteOpacity('0.8')};
  height: 18px;
`;

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};
