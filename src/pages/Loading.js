import React from 'react';
import styled from 'styled-components';

import '../assets/fonts/font.css';

const Loading = () => {
  return (
    <Wrapper>
      <span>loading...</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: red;
  width: 100%;
  height: 100%;
  background-color: black;

  & > span {
    font-size: 72px;
    color: white;
  }
`;

export default Loading;
