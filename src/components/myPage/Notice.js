import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { myPageApis } from '../../api';
import NoticeItem from './NoticeItem';
import { fontSize } from '../../styles/Mixin';
import { BackButtonHeader } from '../common';

const Notice = () => {
  const history = useHistory();
  const [noticeList, setNoticeList] = useState([]);
  const [isToggleOpen, setIsToggleOpen] = useState(-1);
  const list = [
    {
      content:
        '반갑습니다, HabitMonster입니다!\n\n저희 팀은 많은 분들이 좋은 습관을 생성하고 유지하여 성장하는 습관을 기를 수 \n있게 도와주는 서비스를 만들기위해 지난 한달간 달려왔습니다.   \n\n우리들의 삶은 습관으로 이루어져 있다고 생각합니다. \n오늘 하루 우리들은 습관대로 생각하고, 말하고 행동해왔을 겁니다. \n이렇게 습관은 항상 우리 곁에 있으며 우리의 정체성을 결정하며 삶의 방향에 영향을 미칩니다.\n\nHabitMonster와 함께 좋은 습관을 생성하고 유지하는 일상이 하루하루 쌓이다 보면 매일 성장하고 발전하는 여러분들을 보실 수 있을 거라 확신합니다.\n\n저희팀은 HabitMonster를 사용해 주시는 많은 분들이 좋은 습관을 지속적으로 유지할 수 있게 도와주는 서비스를 만들기 위해 남은 기간 열심히 노력하겠습니다. \n\n아직 부족한 점이 많겠지만 앞으로 보내주시는 소중한 의견들을 모아 더 나은 서비스를 제공하기 위해 노력하겠습니다.\n\nHabitMonster 많은 사랑 부탁드리겠습니다! 감사합니다.',
      createdAt: '2021-11-16',
      id: 1,
      title: '정식런칭 소개',
    },
    {
      content:
        '다들 습관 잘 지키고 계신가요?\n\n저희 팀이 더 나은 서비스를 제공하기 위해 현재 피드백을 받고있지만 피드백 작성이 손이 많이 가는 일인 것 같아요.\n\n그래서 저희가 작은 이벤트를 준비했습니다.\n피드백을 작성해주신 분들께 추첨을 통해 저희의 마음이 담긴 선물을 드리려고해요!\n\n참여방법은 아래 글을 참고해주세요.',
      createdAt: '2021-11-16',
      id: 2,
      title: '피드백 이벤트',
    },
  ];

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
        console.log('noticeResponses.data', data, data.noticeVoList);
        setNoticeList(data.noticeVoList);
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
      <PageTitle>
        <BackButtonHeader
          onButtonClick={() => {
            history.push('/mypage');
          }}
          pageTitleText="공지사항"
        />
      </PageTitle>
      <NotiList>
        {list.length > 0 &&
          list.map((notice, index) => {
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
