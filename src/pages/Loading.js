import React from 'react';
import styled from 'styled-components';

import '../assets/fonts/font.css';

const Loading = () => {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Text = styled.p`
  font-family: Retro Gaming;
  font-size: var(--font-medium);
  color: var(--color-white);
  text-align: center;
`;

export default Loading;
