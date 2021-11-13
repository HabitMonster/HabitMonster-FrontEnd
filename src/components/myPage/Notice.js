import React from 'react';
import styled from 'styled-components';

const Notice = (props) => {
  return (
    <Wrap>
      <NotiText>
        아직 새로운 <br /> 공지사항이 없어요!
      </NotiText>
    </Wrap>
  );
};

export default Notice;

const Wrap = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
`;

const NotiText = styled.p`
  color: var(--color-primary);
  font-size: 24px;
  font-weight: var(--weight-bold);
  line-height: 1.5;
  margin: 250px 90px;
`;
