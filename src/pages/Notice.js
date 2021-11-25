import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { myPageApis } from '../api';
import NoticeItem from '../components/myPage/NoticeItem';
import { BackButtonHeader } from '../components/common';

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
        console.log('noticeResponses.data', data, data.notices);
        setNoticeList(data.notices);
      }
    } catch (error) {
      console.log(error);
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

export default Notice;

const Container = styled.div`
  max-width: 414px;
  width: 100%;
  height: 100%;
  /* position: relative; */
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
