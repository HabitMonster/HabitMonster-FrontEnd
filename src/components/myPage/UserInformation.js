import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
  useResetRecoilState,
} from 'recoil';
import { useHistory, Link } from 'react-router-dom';

import { authState } from '../../recoil/states/auth';
import { myPageDataState, userState } from '../../recoil/states/user';
import { habitIdListState } from '../../recoil/states/habit';

import { BottomDialog } from '../dialog';
import { Modal, Toast } from '../../components/common';
import { EditBox, UserInfoItem } from '../../components/myPage';
import { MonsterThumbnailWrapper } from '../../components/monster';

import { myPageApis } from '../../api';
import { USER_DELETED } from '../../constants/statusMessage';
import { Pencil } from '../../assets/icons/common';
import { monsterState } from '../../recoil/states/monster';

const UserInformation = () => {
  const setAuth = useSetRecoilState(authState);
  const { userInfo, monster } = useRecoilValue(myPageDataState); // 비동기요청
  const resetUserInfoState = useResetRecoilState(userState);

  const history = useHistory();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setdeleteAccountModalOpen] = useState(false);
  const [isEditToastOpen, setIsEditToastOpen] = useState(false);
  const [isLogoutToastOpen, setIsLogoutToastOpen] = useState(false);
  const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);
  const [deleteAccountToastOpen, setDeleteAccountToastOpen] = useState(false);

  const [editData, setEditData] = useState({
    type: 'username',
    title: '제가 뭐라고 부르면 좋을까요?',
    value: userInfo.username,
  }); // 수정할 값 (닉네임, 몬스터이름, 모달 제목)

  const openModal = useCallback(
    (type) => {
      if (type === 'monsterName') {
        setEditData({
          type: 'monsterName',
          title: '변경할 몬스터 이름을 적어주세요!',
          value: monster.monsterName,
        });
      }

      setIsEditModalOpen(true);
    },
    [monster.monsterName],
  );

  const closeModal = useCallback(() => {
    // state 초기화
    setEditData({
      type: 'username',
      title: '제가 뭐라고 부르면 좋을까요?',
      value: userInfo.username,
    });
    setIsEditModalOpen(false);
  }, [userInfo.username]);

  const handleChangeValue = useCallback((value) => {
    setEditData((editData) => ({
      ...editData,
      value,
    }));
  }, []);

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
    setIsCopyToastOpen(true);
  };

  const logoutUser = () => {
    window.localStorage.removeItem('habitAccessToken');
    window.localStorage.removeItem('habitRefreshToken');
    setAuth({ isFirstLogin: null, isLogin: false });
    setIsLogoutToastOpen(true);
    resetUserInfoState();
    history.push('/login');
  };

  const deleteUserAccount = useRecoilCallback(({ set }) => async () => {
    try {
      const { data } = await myPageApis.deleteUser();

      if (data.responseMessage === USER_DELETED) {
        window.localStorage.removeItem('habitAccessToken');
        window.localStorage.removeItem('habitRefreshToken');
        resetUserInfoState();
        set(authState, {
          isFirstLogin: null,
          isLogin: false,
        });
        set(habitIdListState, []);
        set(myPageDataState, {});
        set(userState, {});
        history.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  });

  const userInfoList = Object.keys(userInfo).length
    ? [
        {
          title: '몬스터 이름',
          contents: monster.monsterName,
          handleClick: () => openModal('monsterName'),
        },
        {
          title: '몬스터 코드',
          contents: userInfo.monsterCode,
          isCopy: true,
          handleClipBoard: () => copyCode(userInfo.monsterCode),
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
        // {
        //   title: '신고하기',
        //   contents: '',
        //   handleClick: () => window.open('구글폼주소', '_blank'),
        // },
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
      ]
    : [];

  return (
    <>
      {/* <TitleArea>
        <PageTitle>마이페이지</PageTitle>
      </TitleArea> */}
      <UserInfoWrap>
        <MonsterThumbnailWrapper
          thumbnailSize="small"
          monsterLevel={monster.monsterLevel}
          monsterId={monster.monsterId}
        />
        <div>
          <BoldText>{userInfo.username}</BoldText>
          <EditNicknameBtn onClick={() => openModal('username')}>
            <Pencil />
          </EditNicknameBtn>
        </div>
        <Summary>
          <li>
            {/* <BoldText>{userInfo?.totalHabitCount ?? 1000}</BoldText> */}
            <span>총 습관</span>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: '/follow',
                search: '?tab=followers',
              }}
            >
              {/* <BoldText>{userInfo?.followersCount ?? 1000}</BoldText> */}
              <span>팔로워</span>
            </FollowLink>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: '/follow',
                search: '?tab=following',
              }}
            >
              {/* <BoldText>{userInfo?.followingsCount ?? 1000}</BoldText> */}
              <span>팔로잉</span>
            </FollowLink>
          </li>
        </Summary>
      </UserInfoWrap>
      <UserInfoList>
        {userInfoList.map((userInfoItem) => {
          console.log('userInfoItem', userInfoItem);
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
            activeToast={setIsEditToastOpen}
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
            height="141px"
            activeButtonText="로그아웃하기"
            onActive={logoutUser}
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
            height="182px"
            title="정말 탈퇴하시겠어요?"
            description="탈퇴하시면 기존에 있던 정보들이 다 사라져요!"
            activeButtonText="탈퇴하기"
            onActive={() => {
              setDeleteAccountToastOpen(true);
              deleteUserAccount();
            }}
            onClose={() => setdeleteAccountModalOpen(false)}
          />
        </Modal>
      )}
      <Toast
        isActive={isCopyToastOpen}
        setIsActive={setIsCopyToastOpen}
        text="클립보드에 복사되었습니다!"
      />
      <Toast
        isActive={isLogoutToastOpen}
        setIsActive={setIsLogoutToastOpen}
        text="로그아웃 되었습니다!"
      />
      <Toast
        isActive={isEditToastOpen}
        setIsActive={setIsEditToastOpen}
        text="변경 되었습니다!"
      />
      <Toast
        isActive={deleteAccountToastOpen}
        setIsActive={setDeleteAccountToastOpen}
        text="탈퇴는 못참지"
      />
    </>
  );
};

export default UserInformation;

// const TitleArea = styled.div`
//   height: 44px;
//   margin: 24px;
//   align-items: center;
//   display: flex;
//   align-items: center;
// `;

// const PageTitle = styled.p`
//   ${fontSize('18px')};
//   font-weight: var(--weight-regular);
//   color: var(--color-primary);
// `;

const UserInfoList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

const EditNicknameBtn = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 3px 0 0 2px;
  height: 19px;
`;

const UserInfoWrap = styled.div`
  color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }
`;

const BoldText = styled.p`
  font-size: var(--font-m);
  font-weight: var(--weight-bold);
  line-height: 19px;
`;

const FollowLink = styled(Link)`
  color: var(--color-primary);
  font-size: var(--font-xxs);
  font-weight: var(--weight-semi-regular);
  text-decoration: none;
  text-align: center;
`;

const Summary = styled.ul`
  height: 34px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 24px 0;

  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1 1 0;

    & span {
      font-size: var(--font-xxs);
      font-weight: var(--weight-semi-regular);
      line-height: 15px;
    }

    &::after {
      background-color: var(--color-title);
      position: absolute;
      content: '';
      width: 1px;
      height: 25px;
      opacity: 0.5;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &::last-child {
      &::after {
        width: 0;
      }
    }
  }
`;
