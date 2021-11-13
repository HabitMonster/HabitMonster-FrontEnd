import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { getCookie, deleteCookie } from '../../utils/cookie';

import { authState } from '../../recoil/states/auth';
import { myPageDataState } from '../../recoil/states/user';

import UserInfoItem from './UserInfoItem';
import { Modal } from '../../components/common';
import { EditBox } from '../../components/myPage';
import { BottomDialog } from '../dialog';

const UserInformation = () => {
  const resetAuth = useResetRecoilState(authState);
  const myPageData = useRecoilValue(myPageDataState); // 비동기요청
  const history = useHistory();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    type: 'username',
    title: '제가 뭐라고 부르면 좋을까요?',
    value: myPageData.username,
  }); // 수정할 값 (닉네임, 몬스터이름, 모달 제목)

  const openModal = useCallback(
    (type) => {
      if (type === 'monsterName') {
        setEditData({
          type: 'monsterName',
          title: '변경할 몬스터 이름을 적어주세요!',
          value: myPageData.monsterName,
        });
      }

      setIsEditModalOpen(true);
    },
    [myPageData.monsterName],
  );

  const closeModal = useCallback(() => {
    // state 초기화
    setEditData({
      type: 'username',
      title: '제가 뭐라고 부르면 좋을까요?',
      value: myPageData.username,
    });
    setIsEditModalOpen(false);
  }, [myPageData.username]);

  const handleChangeValue = useCallback(
    (value) => {
      setEditData((editData) => ({
        ...editData,
        value,
      }));
    },
    [editData.value],
  );

  const logoutUser = () => {
    const token = getCookie('accessToken');

    if (!token) {
      <div>먼저 로그인을 해주세요!</div>;
    }
    window.localStorage.removeItem('habitAccess');
    window.localStorage.removeItem('habitRefresh');
    window.localStorage.removeItem('isFirstLogin');
    window.localStorage.removeItem('isOnboarding');
    resetAuth();
    setIsLogoutModalOpen(false);
    history.replace('/login', null);
  };

  const userInfoList = [
    {
      title: '닉네임',
      contents: myPageData.username,
      handleClick: () => openModal('username'),
    },
    {
      title: '몬스터 이름',
      contents: myPageData.monsterName,
      handleClick: () => openModal('monsterName'),
    },
    {
      title: '몬스터 코드',
      contents: myPageData.monsterCode,
    },
    {
      title: '현재 버전',
      contents: 'V_1.0.0',
    },
    {
      title: '로그아웃',
      contents: '',
      handleClick: () => setIsLogoutModalOpen(true),
      isLogout: true,
    },
  ];

  return (
    <>
      <UserInfoList>
        {userInfoList.map((userInfoItem) => {
          return (
            <UserInfoItem
              key={userInfoItem.title}
              userInfoItem={userInfoItem}
            />
          );
        })}
      </UserInfoList>
      {isEditModalOpen && (
        <Modal open={isEditModalOpen} onClose={closeModal}>
          <EditBox
            type={editData.type}
            editValue={editData.value}
            handleChangeValue={handleChangeValue}
            pageTitleText={editData.title}
            closeModal={closeModal}
          />
        </Modal>
      )}
      {isLogoutModalOpen && (
        <Modal
          open={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          blurmode={true}
        >
          <BottomDialog
            title="정말 로그아웃하시겠어요?"
            activeButtonText="로그아웃하기"
            onActive={() => logoutUser()}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default UserInformation;

const UserInfoList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;
