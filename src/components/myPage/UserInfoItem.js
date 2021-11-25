import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiteOpacity } from '../../styles';
import { EditIcon, CopyIcon } from '../../assets/icons/common';

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
            <CopyIcon />
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
  font-size: var(--font-s);
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

const CopyWrap = styled.div`
  padding-left: 8px;
  cursor: pointer;
`;

const PrivateText = styled.p`
  font-size: var(--font-xs);
  line-height: 16px;
  font-weight: var(--weight-regular);
  ${whiteOpacity('0.8')};
  height: 17px;
`;

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};
