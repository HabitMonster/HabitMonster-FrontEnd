import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const MyPage = () => {
  if (localStorage.getItem('isFirstLogin') === 'true') {
    return <Redirect to="/monster" />;
  }

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
