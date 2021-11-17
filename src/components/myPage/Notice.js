import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { myPageApis } from '../../api';
import styled from 'styled-components';

import NoticeItem from './NoticeItem';
import { fontSize } from '../../styles/Mixin';
import { BackButtonHeader } from '../common';

const Notice = () => {
  const history = useHistory();
  const [noticeData, setNoticeList] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState('0');

  const handleToggle = (index) => {
    if (isToggleOpen === index) {
      return setIsToggleOpen('0');
    }
    setIsToggleOpen(index);
  };

  const getNoticeList = async () => {
    try {
      const noticeResponses = await myPageApis.loadNoticeData();
      if (noticeResponses.data.statusCode === 200) {
        console.log('noticeResponses.data', noticeResponses.data.noticeVoList);
        setNoticeList(noticeResponses.data.noticeVoList);
        console.log(noticeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNoticeList();
    console.log('noticeData', noticeData);
  }, []);

  return (
    <Container>
      <PageTitle>
        <BackButtonHeader
          onButtonClick={() => {
            history.push('/mypage');
          }}
          pageTitleText="공지사항"
        />
      </PageTitle>
      <NotiList>
        {/* {noticeData.map((index, notiInfo) => {
          return (
            <NoticeItem
              key={index}
              notiInfo={notiInfo}
              active={isToggleOpen === index}
              onToggle={() => handleToggle(index)}
            />
          );
        })} */}
      </NotiList>
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

const PageTitle = styled.div`
  display: flex;
  height: 44px;
  padding-left: 16px;
  font-weight: 500;
  ${fontSize('16px')}
  line-height: 22px;
`;
