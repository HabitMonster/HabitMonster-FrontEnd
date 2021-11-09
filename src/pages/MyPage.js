import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const MyPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isFirstLogin') === 'true') {
      return history.replace('/monster');
    }
  }, []);

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
