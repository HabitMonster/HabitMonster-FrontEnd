import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { authState } from '../../recoil/states/auth';
import { myPageDataState } from '../../recoil/states/user';

import UserInfoItem from './UserInfoItem';
import { Modal } from '../../components/common';
import { EditBox } from '../../components/myPage';
import { fontSize } from '../../styles/Mixin';
import { BottomDialog } from '../dialog';

const UserInformation = () => {
  const setAuth = useSetRecoilState(authState);
  const myPageData = useRecoilValue(myPageDataState); // 비동기요청
  const history = useHistory();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setdeleteAccountModalOpen] = useState(false);
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

  const copyCode = (contents) => {
    // 흐름 1.
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }

    // 흐름 2.
    const textarea = document.createElement('textarea');
    textarea.value = contents;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 4.
    document.execCommand('copy');
    // 흐름 5.
    document.body.removeChild(textarea);
    console.log('복사된거 맞나', contents, textarea.value);
    alert('클립보드에 복사되었습니다.');
  };

  const logoutUser = () => {
    const token = window.localStorage.getItem('habitAccessToken');

    if (!token) {
      <div>먼저 로그인을 해주세요!</div>;
    }

    window.localStorage.removeItem('habitAccessToken');
    window.localStorage.removeItem('habitRefreshToken');
    setAuth({ isFirstLogin: null, isLogin: false });
    history.push('/login', null);
  };

  // const DeleteUser = async() => {
  // };

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
      isCopy: true,
      handleClipBoard: () => copyCode(myPageData.monsterCode),
    },
    {
      title: '팔로워 목록보기',
      contents: '',
      handleClick: () => history.push('/follow'),
    },
    {
      title: '현재 버전',
      contents: 'V_1.0.0',
    },
    {
      title: '공지사항',
      contents: '',
      handleClick: () => history.push('/notice'),
    },
    {
      title: '로그아웃',
      contents: '',
      handleClick: () => setIsLogoutModalOpen(true),
      isLogout: true,
    },
    {
      title: '탈퇴하기',
      contents: '',
      handleClick: () => setdeleteAccountModalOpen(true),
      isDeleteAccount: true,
    },
  ];

  return (
    <>
      <UserInfoList>
        <TitleArea>
          <PageTitle>마이페이지</PageTitle>
        </TitleArea>
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
      {deleteAccountModalOpen && (
        <Modal
          open={deleteAccountModalOpen}
          onClose={() => setdeleteAccountModalOpen(false)}
          blurmode={true}
        >
          <BottomDialog
            title="정말 탈퇴하시겠어요?"
            description="탈퇴하시면 기존에 있던 정보들이 다 사라져요!"
            activeButtonText="탈퇴하기"
            onActive={() => {
              console.log('탈퇴는 못참지');
            }}
            onClose={() => setdeleteAccountModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default UserInformation;

const TitleArea = styled.div`
  height: 44px;
  margin: 20px 0 20px 24px;
  align-items: center;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.p`
  ${fontSize('18px')};
  font-weight: var(--weight-regular);
  color: var(--color-primary);
`;

const UserInfoList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
  height: 100%;
`;
