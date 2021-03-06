import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import {
  onboard01,
  onboard02,
  onboard03,
  onboard04,
} from '../../assets/images/onboard';

import { BottomFixedButton } from '../common';

import { setFontStyles, setFlexStyles } from '../../styles';

SwiperCore.use([Pagination]);

const OnBoard = () => {
  const history = useHistory();

  return (
    <OnBoardContainer>
      <TitleContainer>
        <TitleWrapper>
          <Title>Habit</Title>
          <Title>Monster</Title>
        </TitleWrapper>
        <Swiper
          className="banner"
          initialSlide={0}
          style={{
            width: '100%',
            maxWidth: '320px',
          }}
          navigation
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <SubTitleBox>
              <SubTitle>몬스터와 함께하는 새로운 습관의 시작!</SubTitle>
            </SubTitleBox>
            <Image bg={onboard01} className="first-image" />
          </SwiperSlide>
          <SwiperSlide>
            <SubTitleBox>
              <SubTitle>몬스터가 어떻게 변할지 궁금하지 않으신가요?</SubTitle>
            </SubTitleBox>
            <Image bg={onboard02} className="second-image" />
          </SwiperSlide>
          <SwiperSlide>
            <SubTitleBox>
              <SubTitle className="doubleLine">진화하는 몬스터와 함께</SubTitle>
              <SubTitle className="doubleLine">
                변화 될 당신의 모습도 궁금하군요!
              </SubTitle>
            </SubTitleBox>
            <Image bg={onboard03} className="third-image" />
          </SwiperSlide>
          <SwiperSlide>
            <SubTitleBox>
              <SubTitle>지금 당장 해빗몬스터와 시작해볼까요?</SubTitle>
            </SubTitleBox>
            <Image bg={onboard04} className="fourth-image" />
          </SwiperSlide>
        </Swiper>
      </TitleContainer>
      <BottomFixedButton
        text="시작하기"
        condition={null}
        onClick={() => {
          window.localStorage.setItem('isOnboarding', false);
          history.replace('/login');
        }}
      />
    </OnBoardContainer>
  );
};

const OnBoardContainer = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  })}
  width: 100%;
  height: 100%;
  background-color: var(--bg-wrapper);
  & .swiper-wrapper {
    height: 300px;
  }
  & .swiper-pagination {
    top: 220px;
  }
  & .swiper-pagination-bullet {
    background: var(--color-title);
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: var(--color-onboard);
    }
  }
  & .swiper-button-next,
  & .swiper-button-prev {
    display: none;
  }
`;

const TitleContainer = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  })}

  font-family: var(--font-name-apple);
`;

const TitleWrapper = styled.div`
  width: 187px;
  height: 90px;
  margin: 100px auto 18px auto;
  line-height: 43px;
`;

const Title = styled.p`
  ${setFontStyles({
    color: 'white',
    fontSize: 'maximum',
    fontWeight: 'extra-bold',
  })}
`;

const SubTitleBox = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  })}
  height: 86px;
  margin: 0 auto;
`;

const SubTitle = styled.p`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'center',
  })}
  height: 17px;
  ${setFontStyles({
    color: 'white',
    fontSize: 'xs',
    fontWeight: 'semi-regular',
    lineHeight: '16.8px',
  })}
  margin: 0 auto;
  opacity: 0.7;
`;

const Image = styled.div`
  width: 220px;
  height: 129px;
  margin: 0 auto;
  margin-bottom: 12px;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default OnBoard;
