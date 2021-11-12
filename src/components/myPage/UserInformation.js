import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { myPageDataState } from '../../recoil/states/user';

import UserInfoItem from './UserInfoItem';
import { Modal } from '../../components/common';
import { EditBox } from '../../components/myPage';

const UserInformation = () => {
  const myPageData = useRecoilValue(myPageDataState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    type: 'username',
    title: '제가 뭐라고 부르면 좋을까요?',
    value: myPageData.username,
  });

  const openModal = useCallback(
    (type) => {
      if (type === 'monsterName') {
        setEditData({
          type: 'monsterName',
          title: '변경할 몬스터 이름을 적어주세요!',
          value: myPageData.monsterName,
        });
      }

      setIsModalOpen(true);
    },
    [myPageData.monsterName],
  );

  const closeModal = useCallback(() => {
    setEditData({
      title: '제가 뭐라고 부르면 좋을까요?',
      value: myPageData.username,
    });
    setIsModalOpen(false);
  }, [myPageData.username]);

  const handleChangeValue = (value) =>
    setEditData((editData) => ({
      ...editData,
      value,
    }));

  const userInfoList = [
    {
      title: '닉네임',
      contents: myPageData.username,
      isPossibleEdit: true,
      handleClick: () => openModal('username'),
    },
    {
      title: '몬스터 이름',
      contents: myPageData.monsterName,
      isPossibleEdit: true,
      handleClick: () => openModal('monsterName'),
    },
    {
      title: '몬스터 코드',
      contents: myPageData.monsterCode,
      isPossibleEdit: false,
    },
    {
      title: '현재 버전',
      contents: 'V_1.0.0',
      isPossibleEdit: false,
    },
    {
      title: '로그아웃',
      contents: '',
      isPossibleEdit: false,
      buttonType: true,
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
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <EditBox
            type={editData.type}
            editValue={editData.value}
            handleChangeValue={handleChangeValue}
            pageTitleText={editData.title}
            closeModal={closeModal}
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
