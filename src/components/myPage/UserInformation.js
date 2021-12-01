import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory, Link } from 'react-router-dom';

import {
  userState,
  myFollowListCountSelector,
  myFollowListByType,
} from '../../recoil/states/user';
import { myHabitCountState } from '../../recoil/states/habit';
import { monsterState } from '../../recoil/states/monster';

import { BottomDialog } from '../dialog';
import { Modal, Toast } from '../../components/common';
import { EditBox, UserInfoItem } from '../../components/myPage';
import { MonsterThumbnailWrapper } from '../../components/monster';

import { myPageApis } from '../../api';
import { USER_DELETED } from '../../constants/statusMessage';
import { Pencil } from '../../assets/icons/common';

import { setFontStyles } from '../../styles/Mixin';

const UserInformation = () => {
  const userInfo = useRecoilValue(userState);
  const monsterInfo = useRecoilValue(monsterState);
  const myHabitCount = useRecoilValue(myHabitCountState);
  const { followerListCount, followingListCount } = useRecoilValue(
    myFollowListCountSelector,
  );
  const refetchFollowList = useSetRecoilState(myFollowListByType(''));

  const history = useHistory();
  const [editModalType, setEditModalType] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setdeleteAccountModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(false);

  const openModal = useCallback((type) => {
    setEditModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setEditModalType('');
  }, []);

  const copyCode = useCallback((contents) => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }

    const textarea = document.createElement('textarea');
    textarea.value = contents;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setTimeout(() => setActiveToast(true), 0);
  }, []);

  const deleteToken = useCallback(() => {
    window.localStorage.removeItem('habit-A-Token');
    window.localStorage.removeItem('habit-R-Token');
  }, []);

  const dispatcher = async (type) => {
    if (type === 'logout') {
      deleteToken();
      window.location.href = '/login';
      return;
    }

    try {
      const { data } = await myPageApis.deleteUser();
      if (data.responseMessage === USER_DELETED) {
        deleteToken();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const userInfoList = [
    {
      title: '몬스터 이름',
      contents: monsterInfo.monsterName,
      handleClick: () => openModal('monsterName'),
    },
    {
      title: '몬스터 코드',
      contents: userInfo.monsterCode,
      isCopy: true,
      handleClick: () => copyCode(userInfo.monsterCode),
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

  useEffect(() => {
    if (activeToast) {
      setTimeout(() => {
        setActiveToast(false);
      }, 2500);
    }
  }, [activeToast]);

  // 마이페이지 밖에서 계속 최신화를 시킬 필요가 있을지?
  // 마이페이지에 들어올 때만 최신화시키면 되지 않을지?
  useEffect(() => {
    return () => {
      if (
        !(
          history.location.pathname.includes('mypage') ||
          history.location.pathname.includes('login')
        )
      ) {
        refetchFollowList();
      }
    };
  }, [history, refetchFollowList]);

  return (
    <>
      <UserInfoWrap>
        <MonsterThumbnailWrapper
          isProfile={true}
          thumbnailSize="small"
          monsterLevel={monsterInfo.monsterLevel}
          monsterId={monsterInfo.monsterId}
        />
        <div>
          <BoldText>{userInfo.userName}</BoldText>
          <EditNicknameBtn onClick={() => openModal('userName')}>
            <Pencil />
          </EditNicknameBtn>
        </div>
        <Summary>
          <li
            onClick={() =>
              history.replace(`/search/${userInfo.monsterCode}`, {
                prev: [history.location.pathname],
              })
            }
          >
            <BoldText>{myHabitCount ?? 0}</BoldText>
            <span>총 습관</span>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: `/follow/${userInfo.monsterCode}`,
                search: '?tab=followers',
                state: {
                  isMe: true,
                  isFromMyPage: true,
                  prev: [history.location.pathname],
                },
              }}
            >
              <BoldText>{followerListCount ?? 0}</BoldText>
              <span>팔로워</span>
            </FollowLink>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: `/follow/${userInfo.monsterCode}`,
                search: '?tab=following',
                state: {
                  isMe: true,
                  isFromMyPage: true,
                  prev: [history.location.pathname],
                },
              }}
            >
              <BoldText>{followingListCount ?? 0}</BoldText>
              <span>팔로잉</span>
            </FollowLink>
          </li>
        </Summary>
      </UserInfoWrap>
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
      {editModalType && (
        <Modal open={!!editModalType} onClose={closeModal}>
          <EditBox type={editModalType} closeModal={closeModal} />
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
            onActive={() => dispatcher('logout')}
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
            onActive={() => dispatcher('delete')}
            onClose={() => setdeleteAccountModalOpen(false)}
          />
        </Modal>
      )}
      {activeToast && (
        <Toast activeToast={activeToast} text="클립보드에 복사되었습니다!" />
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
  ${setFontStyles({
    fontSize: 'm',
    fontWeight: 'bold',
    lineHeight: '19px',
  })}
`;

const FollowLink = styled(Link)`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxs',
    fontWeight: 'semi-regular',
  })}
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
    cursor: pointer;
    & span {
      ${setFontStyles({
        fontSize: 'xxs',
        fontWeight: 'semi-regular',
        lineHeight: '15px',
      })}
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
    &:last-child {
      &::after {
        width: 0;
      }
    }
  }
`;
