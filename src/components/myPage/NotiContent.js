import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiteOpacity } from '../../styles/Mixin';
import { ImageSlider } from '../../components/common';

const NotiContent = ({ id }) => {
  switch (id) {
    case 1:
      return (
        <NotiBox>
          <p>반갑습니다, HabitMonster입니다 !</p>
          <p>
            저희 팀은 많은 분이 좋은 습관을 생성하고 유지하여 성장하는 습관을
            기를 수 있게 도와주는 서비스를 만들기 위해 지난 한 달간 열심히
            달려왔습니다.
          </p>
          <p>
            우리들의 삶은 습관으로 이루어져 있다고 생각합니다. 오늘 하루 우리는
            습관대로 생각하고, 말하고 행동해왔을 겁니다. 이렇게 습관은 항상 우리
            곁에 있으며 우리의 정체성을 결정하며 삶의 방향에 영향을 미칩니다.
            Habit Monster와 함께 좋은 습관을 생성하고 유지하는 일상이 하루하루
            쌓이다 보면 매일 성장하고 발전하는 여러분들을 보실 수 있을 거라
            확신합니다.
          </p>
          <p>
            저희 팀은 Habit Monster를 사용해 주시는 많은 분이 좋은 습관을
            지속해서 유지할 수 있게 도와주는 서비스를 만들기 위해 남은 기간 더욱
            열심히 노력하겠습니다.
          </p>
          <p>
            아직 부족한 점이 많겠지만 앞으로 보내주시는 소중한 의견들을 모아 더
            나은 서비스를 제공하기 위해 노력하겠습니다.
          </p>
          <p>Habit Monster 많은 사랑 부탁드리겠습니다!</p> <p>감사합니다.🙏🏻</p>
        </NotiBox>
      );
    case 2:
      return (
        <NotiBox>
          <p>여러분 다들 약속한 습관 잘 지키고 계신가요? 😈</p>
          <p>
            저희 팀은 Habit Monster를 이용해주시는 많은 분께 더 나은 서비스를
            제공하기 위해 사용 경험에 대한 피드백을 받고 있습니다. 피드백
            작성해주시는 것이 손이 많이 가는 일인 만큼 여러분이 정성스럽게
            작성해주신 내용을 발판 삼아 저희 헤빗 몬스터는 앞으로 더 발전된
            모습을 보여드릴 것을 약속드리겠습니다. 🤙🏻
          </p>
          <p>
            그래서 저희의 감사한 마음을 담아 작은 이벤트를 준비했습니다!
            피드백을 작성해주신 분들께 추첨을 통해 저희의 마음이 담긴 선물을
            드리려고 합니다.
          </p>
          <p>참여방법은 아래 글을 참고해주세요!</p>
          <br />
          <ListNumbering>* 참여방법 😈</ListNumbering>
          <ol>
            <ListText>
              1. HabitMonster서비스 이용 후 메인페이지 좌측 상단의 “피드백”
              아이콘을 누른 후 나오는 설문지를 작성하여 피드백을 제출한다.
            </ListText>{' '}
            <ListText>
              2. 12월 5일 추첨을 통해 스타벅스 기프티콘을 받아 맛있게 마신다.
            </ListText>
          </ol>
          <p>
            ❤️ 작성해주신 이메일을 통해 기프티콘을 발송하오니 피드백 제출 전
            이메일을 다시한번 꼭 확인해주세요.
          </p>
          <p>
            🔥 피드백을 작성해주신 분들 중 저희가 생각하지 못 했던 참신한 내용의
            피드백을 주신 한분을 추첨하여 유명 브랜드의 치킨 기프티콘을
            드리겠습니다.
          </p>
          <br />
          <p>여러분의 많은 참여와 지속적인 관심과 사랑 부탁드립니다.</p>
          <p> 감사합니다. 🙏🏻</p>
        </NotiBox>
      );
    case 3:
      return (
        <NotiBox>
          <p>
            Habit Monster는 PC뿐만 아니라 스마트폰에서도 사용할 수 있게 만든
            서비스입니다.
          </p>
          <p>
            스마트폰 웹 브라우저에서는 사용하시기에 다소 불편하시기 때문에 아래
            있는 추가 및 설치 방법을 사용해서 서비스를 사용해주시면 더욱 편하게
            사용하실 수 있습니다.
          </p>
          <ListNumbering>
            <b>아이폰 Safari 💡</b>
          </ListNumbering>
          <ol>
            <ListText>
              1. Safari에 접속한 후 검색창에 habitmonster.app 입력해주세요.
            </ListText>{' '}
            <ListText>2. 동그라미 표시를 눌러주세요.</ListText>
            <ListText>3. 홈 화면에 추가를 눌러주세요.</ListText>
            <ListText>4. 추가를 눌러주세요.</ListText>
            <ListText>
              5. 이제부터 앱으로 설치된 HabitMonster 서비스를 편하게 이용하실 수
              있습니다.
            </ListText>
          </ol>
          <ImageSlider imageType="iphoneTutorial" />
          <br />
          <ListNumbering>
            <b>안드로이드 Chrome 💡</b>
          </ListNumbering>
          <ol>
            <ListText>
              1. Chrome에 접속한 후 검색창에 habitmonster.app을 입력해주세요.
            </ListText>
            <ListText>2. 동그라미 표시를 눌러주세요.</ListText>
            <ListText>3. 홈 화면에 추가를 눌러주세요.</ListText>
            <ListText>4. 추가를 눌러주세요.</ListText>
            <ListText>
              5. 홈 화면 추가 표시가 없거나 앱으로 설치하시고 싶으신 분들은 다시
              한 번 들어오셔서 앱 설치를 눌러주세요.
            </ListText>
            <ListText>6. 설치를 눌러주세요.</ListText>
            <ListText>
              7. 이제부터 앱으로 설치된 HabitMonster 서비스를 편하게 이용하실 수
              있습니다.
            </ListText>
          </ol>
          <ImageSlider imageType="androidTutorial" />
          <br />
          <p>여러분의 많은 참여와 지속적인 관심과 사랑 부탁드립니다.</p>
          <p> 감사합니다. 🙏🏻</p>
        </NotiBox>
      );
    default:
      return null;
  }
};

export default NotiContent;

const NotiBox = styled.div`
  color: var(--color-primary);
  line-height: 22px;
  padding: 18px;

  & p {
    font-size: var(--font-xs);
    ${whiteOpacity('0.8')};
    font-weight: var(--weight-semi-regular);
    white-space: pre-wrap;
    margin-bottom: 10px;
  }
`;

const ListNumbering = styled.h5`
  font-size: var(--font-s);
  ${whiteOpacity('0.8')};
  font-weight: var(--weight-bold);
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const ListText = styled.li`
  font-size: var(--font-xs);
  ${whiteOpacity('0.8')};
  font-weight: var(--weight-semi-regular);
  white-space: pre-wrap;
  padding-left: 15px;
  margin-bottom: 5px;
`;

NotiContent.propTypes = {
  id: PropTypes.number.isRequired,
};
