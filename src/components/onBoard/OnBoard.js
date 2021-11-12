import React from 'react';
import styled from 'styled-components';

import { titleMonster } from '../../assets/images/login';

import {
  onboard01,
  onboard02,
  onboard03,
  onboard04,
} from '../../assets/images/onboard';

import { BottomFixedButton } from '../common';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { useHistory } from 'react-router';

const OnBoard = () => {
  const history = useHistory();

  return (
    <>
      <OnBoardContainer>
        <TitleContainer>
          <TitleWrapper>
            <TitleImage />
            <Title>Habit</Title>
            <Title>Monster</Title>
          </TitleWrapper>
          <SubTitle>몬스터와 함께하는 새로운 습관의 시작!</SubTitle>
          <Swiper
            className="banner"
            spaceBetween={8}
            slidesPerView={1}
            centeredSlides={true}
            initialSlide={1}
            style={{ width: '360px', height: '500px', color: 'white' }}
          >
            <SwiperSlide>
              <Image bg={onboard01} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard02} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard03} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard04} />
            </SwiperSlide>
          </Swiper>
        </TitleContainer>
        <BottomFixedButton
          text="시작하기"
          condition={null}
          onClick={() => {
            history.replace('/login');
            localStorage.setItem('isOnboarding', false);
          }}
        />
      </OnBoardContainer>
    </>
  );
};

const OnBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--bg-wrapper);

  & .swiper-button-next,
  & .swiper-button-prev {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: var(--font-name-apple);
`;

const TitleWrapper = styled.div`
  width: 187px;
  height: 90px;
  margin: 100px auto 18px auto;
  line-height: 43px;
`;

const TitleImage = styled.div`
  position: absolute;
  top: 100px;
  left: 225px;
  width: 38.8px;
  height: 38.66px;
  background-image: url(${titleMonster});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Title = styled.p`
  color: var(--color-white);
  font-size: var(--font-maximum);
  font-weight: var(--weight-extra-bold);
`;

const SubTitle = styled.p`
  width: 213px;
  height: 17px;
  font-weight: var(--weight-semi-regular);
  font-size: var(--font-xs);
  line-height: 16.8px;
  color: var(--color-white);
  margin: 0 auto;
  margin-bottom: 75px;
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
