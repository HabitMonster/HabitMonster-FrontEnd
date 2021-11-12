import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, whiteOpacity } from '../../styles';
import { EditIcon } from '../../assets/icons/common';
import { Modal } from '../common';
import { BottomDialog } from '../dialog';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { useRecoilValue } from 'recoil';

const UserInfoItem = ({ userInfoItem }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { title, contents, isPossibleEdit, handleClick, buttonType } =
    userInfoItem;

  const logoutUser = () => {
    const token = getCookie('accessToken');

    if (!token) {
      <div>먼저 로그인을 해주세요!</div>;
    }
    deleteCookie(token);
    setLogoutModal(false);
  };

  if (buttonType) {
    return (
      <InfoListItem>
        <ButtonWrap onClick={() => setLogoutModal(true)}>
          <DefaultTitle>{title}</DefaultTitle>
        </ButtonWrap>
        {
          <Modal open={logoutModal} onClose={() => setLogoutModal(false)}>
            <BottomDialog
              title="정말 로그아웃하시겠어요?"
              activeButtonText="로그아웃하기"
              onActive={() => logoutUser()}
              onClose={() => setLogoutModal(false)}
            />
          </Modal>
        }
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
