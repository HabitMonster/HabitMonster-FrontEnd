import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, whiteOpacity } from '../../styles';
import { EditIcon } from '../../assets/icons/common';

const UserInfoItem = ({ userInfoItem }) => {
  const { title, contents, handleClick, isLogout } = userInfoItem;
  const isPossibleEdit = !!handleClick;

  return (
    <InfoListItem isCursor={isPossibleEdit} onClick={handleClick}>
      <DefaultTitle>{title}</DefaultTitle>
      <PrivateTextWrap>
        {contents && <PrivateText>{contents}</PrivateText>}
        {isPossibleEdit && !isLogout && (
          <EditButton>
            <EditIcon />
          </EditButton>
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
`;

const PrivateText = styled.p`
  ${fontSize('14px')};
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  ${whiteOpacity('0.8')};
  height: 18px;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: 0;
  /* cursor: pointer; */
  height: 18px;
  outline: 0;
  margin-left: 7px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};
