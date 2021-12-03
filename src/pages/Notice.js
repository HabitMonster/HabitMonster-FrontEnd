import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { myPageApis } from '../api';

import { BackButtonHeader } from '../components/common';
import { NoticeItem } from '../components/myPage';

const Notice = () => {
  const history = useHistory();
  const [noticeList, setNoticeList] = useState([]);
  const [isToggleOpen, setIsToggleOpen] = useState(-1);

  const handleToggle = (index) => {
    if (isToggleOpen === index) {
      return setIsToggleOpen(-1);
    }
    setIsToggleOpen(index);
  };

  const getNoticeList = async () => {
    try {
      const { data } = await myPageApis.loadNoticeData();
      if (data.statusCode === 200) {
        const newNotiList = data.notices.sort((a, b) => {
          if (b.createdAt && a.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return b.id - a.id;
        });
        setNoticeList(newNotiList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <Container>
      <BackButtonHeader
        onButtonClick={() => {
          history.push('/mypage');
        }}
        pageTitleText="공지사항"
      />
      <NotiListWrap>
        <NotiList>
          {noticeList?.length > 0 &&
            noticeList.map((notice, index) => {
              return (
                <NoticeItem
                  key={index}
                  notice={notice}
                  active={isToggleOpen === index}
                  onToggle={() => handleToggle(index)}
                />
              );
            })}
        </NotiList>
      </NotiListWrap>
    </Container>
  );
};

const Container = styled.div`
  max-width: 414px;
  width: 100%;
  height: 100%;
  background: var(--bg-wrapper);
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotiListWrap = styled.div`
  height: calc(100% - 80px);
  overflow-y: auto;
`;

const NotiList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

export default Notice;
