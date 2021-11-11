import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { fontSize } from '../../styles';

import { myPageDataState } from '../../recoil/states/user';

import UserInfoItem from './UserInfoItem';

const UserInformation = (props) => {
  const myPageData = useRecoilValue(myPageDataState); // 비동기요청
  const userInfoList = [
    {
      title: '닉네임',
      contents: myPageData.username,
      isPossibleEdit: true,
    },
    {
      title: '몬스터 이름',
      contents: '마미손',
      isPossibleEdit: true,
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
    },
  ];
  return (
    <UserInfoList>
      {userInfoList.map((userInfoItem) => {
        return (
          <UserInfoItem key={userInfoItem.title} userInfoItem={userInfoItem} />
        );
      })}
    </UserInfoList>
  );
};

export default UserInformation;

const UserInfoList = styled.ul`
  /* border: 1px solid white; */
  margin: 0;
  padding: 0;
`;
