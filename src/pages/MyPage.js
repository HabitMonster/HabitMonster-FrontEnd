import React from 'react';
import Styled from 'styled-components';

const MyPage = () => {
  return (
    <>
      <h1>my page</h1>
      <ProfileImg src="" />
    </>
  );
};

export default MyPage;

const ProfileImg = styled.img`
  border-radius: 50%;
  margin: 0 auto;
`;
