import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { fontSize } from '../../styles';
import { EditIcon } from '../../assets/icons/common';
import { whiteOpacity } from '../../styles/Mixin';
import { BottomPopup } from '../common';

const UserInfoItem = ({ userInfoItem }) => {
  const { title, contents, isPossibleEdit, handleClick, buttonType } =
    userInfoItem;

  if (buttonType) {
    return (
      <InfoListItem>
        <ButtonWrap>
          <DefaultTitle>{title}</DefaultTitle>
        </ButtonWrap>
      </InfoListItem>
    );
  }
  return (
    <InfoListItem>
      <DefaultTitle>{title}</DefaultTitle>
      <PrivateText>
        {contents}
        {isPossibleEdit && (
          <EditButton onClick={handleClick}>
            <EditIcon />
          </EditButton>
        )}
      </PrivateText>
    </InfoListItem>
  );
};

export default UserInfoItem;

const InfoListItem = styled.li`
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

const ButtonWrap = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

const PrivateText = styled.p`
  ${fontSize('14px')};
  line-height: 16px;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  ${whiteOpacity('0.8')};
`;

const EditButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
  height: 12px;
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
