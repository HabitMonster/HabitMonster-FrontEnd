import React, { useState, useEffect } from 'react';
import { myPageApis } from '../../api';
import styled from 'styled-components';

import { BackButtonHeader } from '../common';
const Notice = () => {
  const [noticeData, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    try {
      const noticeResponses = await myPageApis.loadNoticeData();
      if (noticeResponses.status === 200) {
        console.log('noticeResponses.data', noticeResponses.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);
  return (
    <Container>
      <NotiList></NotiList>
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  width: 360px;
  height: 100%;
  /* position: relative; */
  background: var(--bg-wrapper);
  margin: 0 auto;
  padding-top: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotiList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

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
