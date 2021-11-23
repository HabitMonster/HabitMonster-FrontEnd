import React from 'react';
import styled from 'styled-components';

import '../assets/fonts/font.css';

const Loading = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: red;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export default Loading;
